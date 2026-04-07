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

    // Send to Zoho CRM
    let zohoStatus = "skipped";
    try {
      const zohoResult = await createZohoLead({ naam, email, telefoon, onderwerp, bericht });
      zohoStatus = JSON.stringify(zohoResult);
    } catch (err) {
      zohoStatus = `error: ${err instanceof Error ? err.message : String(err)}`;
    }

    return NextResponse.json(
      {
        message: "Bedankt voor uw bericht! Wij nemen zo snel mogelijk contact met u op.",
        debug: {
          zohoStatus,
          envCheck: {
            refreshToken: !!process.env.ZOHO_REFRESH_TOKEN,
            clientId: !!process.env.ZOHO_CLIENT_ID,
            clientSecret: !!process.env.ZOHO_CLIENT_SECRET,
          }
        }
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Er is iets misgegaan. Probeer het later opnieuw." },
      { status: 500 }
    );
  }
}
