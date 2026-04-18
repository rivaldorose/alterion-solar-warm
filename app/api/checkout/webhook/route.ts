import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { createZohoOrder } from "@/lib/zoho";

// Per-instance idempotency cache. For guaranteed once-only processing across
// instances, persist to Redis/KV/Postgres keyed by paymentId.
const processed = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const paymentId = body.get("id") as string;

    if (!paymentId || typeof paymentId !== "string" || !paymentId.startsWith("tr_")) {
      return NextResponse.json({ error: "Invalid payment ID" }, { status: 400 });
    }

    if (processed.has(paymentId)) {
      return NextResponse.json({ received: true, deduped: true });
    }

    const mollieClient = createMollieClient({
      apiKey: process.env.MOLLIE_API_KEY!,
    });

    const payment = await mollieClient.payments.get(paymentId);

    if (payment.status === "paid") {
      processed.add(paymentId);

      const metadata = (payment.metadata || {}) as {
        customer_email?: string;
        customer_name?: string;
        customer_phone?: string;
        address_street?: string;
        address_postcode?: string;
        address_city?: string;
        items?: { name: string; price: number; quantity: number }[];
        total?: number;
      };

      try {
        await createZohoOrder({
          naam: metadata.customer_name || "",
          email: metadata.customer_email || "",
          telefoon: metadata.customer_phone || "",
          adres: metadata.address_street || "",
          postcode: metadata.address_postcode || "",
          plaats: metadata.address_city || "",
          items: metadata.items || [],
          totaal: metadata.total || Number(payment.amount.value),
          paymentId: payment.id,
        });
      } catch (err) {
        console.error("Zoho order error:", err);
        processed.delete(paymentId);
      }
    } else if (["failed", "canceled", "expired"].includes(payment.status)) {
      processed.add(paymentId);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Mollie webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
