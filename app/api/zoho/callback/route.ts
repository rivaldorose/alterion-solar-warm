import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const response = await fetch("https://accounts.zoho.eu/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.ZOHO_CLIENT_ID || "",
      client_secret: process.env.ZOHO_CLIENT_SECRET || "",
      code,
      redirect_uri: `https://alterion-solar-warm.vercel.app/api/zoho/callback`,
    }),
  });

  const data = await response.json();

  if (data.refresh_token) {
    return NextResponse.json({
      message: "Success! Save this refresh token as ZOHO_REFRESH_TOKEN in Vercel env vars.",
      refresh_token: data.refresh_token,
      access_token: data.access_token,
    });
  }

  return NextResponse.json({ error: "Failed to get tokens", data }, { status: 400 });
}
