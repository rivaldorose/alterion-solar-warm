import { NextRequest, NextResponse } from "next/server";
import { createZohoLead } from "@/lib/zoho";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const RATE_LIMIT = 10;
const RATE_WINDOW = 60_000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  const rl = checkRateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW);
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
    const { naam, email, telefoon, onderwerp, bericht, website } = body;

    // Honeypot — silently accept but drop bot submissions
    if (typeof website === "string" && website.length > 0) {
      return NextResponse.json(
        { message: "Bedankt voor uw bericht!" },
        { status: 200 }
      );
    }

    if (!naam || !email || !onderwerp || !bericht) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in (naam, email, onderwerp, bericht)." },
        { status: 400 }
      );
    }

    if (typeof naam !== "string" || naam.length > 100) {
      return NextResponse.json({ error: "Naam is te lang (max 100 tekens)." }, { status: 400 });
    }
    if (typeof email !== "string" || email.length > 254) {
      return NextResponse.json({ error: "E-mailadres is te lang (max 254 tekens)." }, { status: 400 });
    }
    if (typeof onderwerp !== "string" || onderwerp.length > 200) {
      return NextResponse.json({ error: "Onderwerp is te lang (max 200 tekens)." }, { status: 400 });
    }
    if (typeof bericht !== "string" || bericht.length > 5000) {
      return NextResponse.json({ error: "Bericht is te lang (max 5000 tekens)." }, { status: 400 });
    }
    if (telefoon && (typeof telefoon !== "string" || telefoon.length > 30)) {
      return NextResponse.json({ error: "Telefoonnummer is ongeldig." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Voer een geldig e-mailadres in." },
        { status: 400 }
      );
    }

    try {
      await createZohoLead({ naam, email, telefoon, onderwerp, bericht });
    } catch (err) {
      console.error("Zoho lead error:", err);
    }

    return NextResponse.json(
      { message: "Bedankt voor uw bericht! Wij nemen zo snel mogelijk contact met u op." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Er is iets misgegaan. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}
