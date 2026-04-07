import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { createZohoOrder } from "@/lib/zoho";
import { getProductByHandle, getProductPrice } from "@/lib/medusa";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests per minute
const RATE_WINDOW = 60_000; // 1 minute in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Te veel verzoeken. Probeer het later opnieuw." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { items, customer, adres } = body;

    if (!items?.length || !customer?.email) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 }
      );
    }

    // Input validation
    if (typeof customer.naam === "string" && customer.naam.length > 200) {
      return NextResponse.json({ error: "Naam is te lang (max 200 tekens)." }, { status: 400 });
    }

    // Validate items and look up prices server-side
    const resolvedItems: { name: string; price: number; quantity: number }[] = [];

    for (const item of items) {
      const { slug, quantity } = item;

      if (!slug || typeof slug !== "string") {
        return NextResponse.json({ error: "Ongeldig product." }, { status: 400 });
      }

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        return NextResponse.json(
          { error: "Ongeldig aantal. Gebruik een positief geheel getal (max 100)." },
          { status: 400 }
        );
      }

      // Look up price from MedusaJS backend (server-side, not trusting client)
      const product = await getProductByHandle(slug);
      if (!product) {
        return NextResponse.json(
          { error: `Product niet gevonden: ${slug}` },
          { status: 400 }
        );
      }

      const price = getProductPrice(product);
      if (price <= 0) {
        return NextResponse.json(
          { error: `Prijs niet beschikbaar voor: ${product.title}` },
          { status: 400 }
        );
      }

      resolvedItems.push({
        name: product.title,
        price,
        quantity,
      });
    }

    const mollieClient = createMollieClient({
      apiKey: process.env.MOLLIE_API_KEY!,
    });

    const totalAmount = resolvedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalWithBtw = totalAmount * 1.21;

    const description = resolvedItems
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(", ");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.alterion.nl";
    const webhookSecret = process.env.MOLLIE_WEBHOOK_SECRET || "";
    const webhookUrl = webhookSecret
      ? `${siteUrl}/api/checkout/webhook?secret=${webhookSecret}`
      : `${siteUrl}/api/checkout/webhook`;

    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: totalWithBtw.toFixed(2),
      },
      description: `Alterion - ${description}`,
      redirectUrl: `${siteUrl}/afrekenen?status=success&paymentId=${encodeURIComponent("pending")}`,
      webhookUrl,
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
        items: resolvedItems,
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
