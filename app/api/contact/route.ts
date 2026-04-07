import { NextRequest, NextResponse } from "next/server";
import { createZohoLead } from "@/lib/zoho";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per minute
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
    const { naam, email, telefoon, onderwerp, bericht } = body;

    // Validate required fields
    if (!naam || !email || !onderwerp || !bericht) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in (naam, email, onderwerp, bericht)." },
        { status: 400 }
      );
    }

    // Input length validation
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

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Voer een geldig e-mailadres in." },
        { status: 400 }
      );
    }

    // Send to Zoho CRM
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
