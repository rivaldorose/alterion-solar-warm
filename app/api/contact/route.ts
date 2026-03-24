import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Voer een geldig e-mailadres in." },
        { status: 400 }
      );
    }

    // TODO: Zoho CRM integration — waiting for API keys from Jamal
    // When keys are available:
    // 1. Authenticate with Zoho using Client ID + Client Secret
    // 2. Create a new Lead/Contact in Zoho CRM with the form data
    // 3. Optionally send confirmation email

    console.log("Contact form submission:", { naam, email, telefoon, onderwerp, bericht });

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
