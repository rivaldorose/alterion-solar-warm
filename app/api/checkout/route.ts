import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { createZohoOrder } from "@/lib/zoho";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, adres } = body;

    if (!items?.length || !customer?.email) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 }
      );
    }

    const mollieClient = createMollieClient({
      apiKey: process.env.MOLLIE_API_KEY!,
    });

    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );
    const totalWithBtw = totalAmount * 1.21;

    const description = items
      .map((item: { name: string; quantity: number }) => `${item.quantity}x ${item.name}`)
      .join(", ");

    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: totalWithBtw.toFixed(2),
      },
      description: `Alterion - ${description}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.alterion.nl"}/afrekenen?status=success`,
      webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.alterion.nl"}/api/checkout/webhook`,
      metadata: {
        customer_email: customer.email,
        customer_name: customer.naam,
        customer_phone: customer.telefoon || "",
      },
    });

    // Send order to Zoho CRM
    try {
      await createZohoOrder({
        naam: customer.naam,
        email: customer.email,
        telefoon: customer.telefoon || "",
        adres: adres?.straat || "",
        postcode: adres?.postcode || "",
        plaats: adres?.plaats || "",
        items,
        totaal: totalWithBtw,
        paymentId: payment.id,
      });
    } catch (err) {
      console.error("Zoho order error:", err);
    }

    return NextResponse.json({
      checkoutUrl: payment.getCheckoutUrl(),
      paymentId: payment.id,
    });
  } catch (err) {
    console.error("Mollie checkout error:", err);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het aanmaken van de betaling." },
      { status: 500 }
    );
  }
}
