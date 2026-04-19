import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { createZohoOrder } from "@/lib/zoho";
import { completeMedusaCart } from "@/lib/medusa";
import { timingSafeEqual } from "crypto";

// Per-instance idempotency cache. For guaranteed once-only processing across
// instances, persist to Redis/KV/Postgres keyed by paymentId.
const processed = new Set<string>();

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // Verify webhook secret (shared-secret in query string — Mollie doesn't support
  // signed webhooks, so this is their recommended pattern).
  const expectedSecret = process.env.MOLLIE_WEBHOOK_SECRET;
  if (expectedSecret) {
    const providedSecret = new URL(request.url).searchParams.get("s") || "";
    if (!constantTimeEqual(providedSecret, expectedSecret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

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
        medusa_cart_id?: string | null;
      };

      // Complete the MedusaJS cart so the order is persisted in the shop admin
      let medusaOrderId: string | null = null;
      if (metadata.medusa_cart_id) {
        const result = await completeMedusaCart(metadata.medusa_cart_id);
        medusaOrderId = result?.orderId || null;
      }

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
          paymentId: medusaOrderId
            ? `${payment.id} / Medusa ${medusaOrderId}`
            : payment.id,
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
