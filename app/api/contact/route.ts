import { NextRequest, NextResponse } from "next/server";
import { createZohoLead } from "@/lib/zoho";

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

    // Send to Zoho CRM if refresh token is configured
    if (process.env.ZOHO_REFRESH_TOKEN) {
      try {
        await createZohoLead({ naam, email, telefoon, onderwerp, bericht });
      } catch (err) {
        console.error("Zoho CRM error:", err);
        // Don't fail the form submission if Zoho fails
      }
    }

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
