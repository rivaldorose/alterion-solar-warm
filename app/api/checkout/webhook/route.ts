import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const paymentId = body.get("id") as string;

    if (!paymentId) {
      return NextResponse.json({ error: "No payment ID" }, { status: 400 });
    }

    const mollieClient = createMollieClient({
      apiKey: process.env.MOLLIE_API_KEY!,
    });

    const payment = await mollieClient.payments.get(paymentId);

    if (payment.status === "paid") {
      console.log("Payment confirmed:", {
        id: payment.id,
        amount: payment.amount,
        metadata: payment.metadata,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Mollie webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
