const ZOHO_TOKEN_URL = "https://accounts.zoho.eu/oauth/v2/token";
const ZOHO_API_URL = "https://www.zohoapis.eu/crm/v2";

let cachedToken: { access_token: string; expires_at: number } | null = null;

async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && Date.now() < cachedToken.expires_at) {
    return cachedToken.access_token;
  }

  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  if (!refreshToken) {
    throw new Error("ZOHO_REFRESH_TOKEN is not set");
  }

  const response = await fetch(ZOHO_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.ZOHO_CLIENT_ID || "",
      client_secret: process.env.ZOHO_CLIENT_SECRET || "",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  if (!data.access_token) {
    throw new Error(`Zoho token refresh failed: ${JSON.stringify(data)}`);
  }

  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + (data.expires_in - 60) * 1000,
  };

  return data.access_token;
}

export async function createZohoLead(lead: {
  naam: string;
  email: string;
  telefoon?: string;
  onderwerp: string;
  bericht: string;
}) {
  const accessToken = await getAccessToken();

  const [voornaam, ...achternaamParts] = lead.naam.split(" ");
  const achternaam = achternaamParts.join(" ") || voornaam;

  const response = await fetch(`${ZOHO_API_URL}/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          First_Name: voornaam,
          Last_Name: achternaam,
          Email: lead.email,
          Phone: lead.telefoon || "",
          Lead_Source: "Website",
          Description: `Onderwerp: ${lead.onderwerp}\n\n${lead.bericht}`,
          Company: "Website Lead",
        },
      ],
    }),
  });

  const data = await response.json();
  return data;
}
