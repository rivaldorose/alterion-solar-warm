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

  const clientId = process.env.ZOHO_CLIENT_ID;
  if (!clientId) {
    throw new Error("ZOHO_CLIENT_ID is not set");
  }

  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("ZOHO_CLIENT_SECRET is not set");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
  params.append("refresh_token", refreshToken);

  const response = await fetch(ZOHO_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
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

export async function createZohoOrder(order: {
  naam: string;
  email: string;
  telefoon: string;
  adres: string;
  postcode: string;
  plaats: string;
  items: { name: string; quantity: number; price: number }[];
  totaal: number;
  paymentId: string;
}) {
  const accessToken = await getAccessToken();

  const productlijst = order.items
    .map((item) => `${item.quantity}x ${item.name} — €${item.price.toLocaleString("nl-NL")}`)
    .join("\n");

  const response = await fetch(`${ZOHO_API_URL}/Deals`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          Deal_Name: `Bestelling ${order.paymentId} — ${order.naam}`,
          Stage: "Closed Won",
          Amount: order.totaal,
          Contact_Name: order.naam,
          Description: `Klant: ${order.naam}\nEmail: ${order.email}\nTelefoon: ${order.telefoon}\n\nAfleveradres:\n${order.adres}\n${order.postcode} ${order.plaats}\n\nProducten:\n${productlijst}\n\nTotaal incl. BTW: €${order.totaal.toFixed(2)}\nMollie ID: ${order.paymentId}`,
          Lead_Source: "Webshop",
        },
      ],
    }),
  });

  const data = await response.json();
  return data;
}
