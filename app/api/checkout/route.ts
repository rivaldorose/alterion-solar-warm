import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { getProductByHandle, getProductPrice } from "@/lib/medusa";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const rl = checkRateLimit(`checkout:${ip}`, RATE_LIMIT, RATE_WINDOW);
  if (rl.limited) {
    return NextResponse.json(
      { error: "Te veel verzoeken. Probeer het later opnieuw." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rl.resetAt - Date.now()) / 1000).toString(),
        },
      }
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof customer.email !== "string" || customer.email.length > 254 || !emailRegex.test(customer.email)) {
      return NextResponse.json({ error: "Voer een geldig e-mailadres in." }, { status: 400 });
    }
    if (typeof customer.naam !== "string" || customer.naam.length > 200 || customer.naam.length < 1) {
      return NextResponse.json({ error: "Naam is ongeldig." }, { status: 400 });
    }
    if (customer.telefoon && (typeof customer.telefoon !== "string" || customer.telefoon.length > 30)) {
      return NextResponse.json({ error: "Telefoonnummer is ongeldig." }, { status: 400 });
    }

    const resolvedItems: { name: string; slug: string; price: number; quantity: number }[] = [];

    for (const item of items) {
      const { slug, quantity } = item;

      if (!slug || typeof slug !== "string" || slug.length > 200) {
        return NextResponse.json({ error: "Ongeldig product." }, { status: 400 });
      }

      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        return NextResponse.json(
          { error: "Ongeldig aantal. Gebruik een positief geheel getal (max 100)." },
          { status: 400 }
        );
      }

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
        slug,
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

    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: totalWithBtw.toFixed(2),
      },
      description: `Alterion - ${description}`,
      redirectUrl: `${siteUrl}/afrekenen/bevestiging`,
      webhookUrl: `${siteUrl}/api/checkout/webhook`,
      metadata: {
        customer_email: customer.email,
        customer_name: customer.naam,
        customer_phone: customer.telefoon || "",
        address_street: adres?.straat || "",
        address_postcode: adres?.postcode || "",
        address_city: adres?.plaats || "",
        items: resolvedItems.map((i) => ({
          slug: i.slug,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        total: totalWithBtw,
      },
    });

    await mollieClient.payments.update(payment.id, {
      redirectUrl: `${siteUrl}/afrekenen/bevestiging?id=${encodeURIComponent(payment.id)}`,
    });

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
