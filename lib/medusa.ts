const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const MEDUSA_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";
const MEDUSA_REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID || "";

interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  status: string;
  images: { url: string }[];
  variants: {
    id: string;
    title: string;
    sku: string;
    calculated_price?: {
      calculated_amount: number;
      currency_code: string;
    };
    prices: {
      amount: number;
      currency_code: string;
    }[];
  }[];
  options: {
    title: string;
    values: { value: string }[];
  }[];
}

interface MedusaResponse<T> {
  products?: T[];
  product?: T;
}

async function medusaFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  const res = await fetch(`${MEDUSA_BACKEND_URL}${path}`, {
    headers: {
      "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
    },
    signal: controller.signal,
    next: { revalidate: 60 },
  });

  clearTimeout(timeout);

  if (!res.ok) {
    throw new Error(`Medusa API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getProducts(): Promise<MedusaProduct[]> {
  try {
    const data = await medusaFetch<MedusaResponse<MedusaProduct>>(
      `/store/products?fields=*variants.calculated_price&region_id=${MEDUSA_REGION_ID}`
    );
    return data.products || [];
  } catch {
    console.error("Failed to fetch products from Medusa");
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<MedusaProduct | null> {
  try {
    const params = new URLSearchParams({
      handle,
      fields: "*variants.calculated_price",
      region_id: MEDUSA_REGION_ID,
    });
    const data = await medusaFetch<MedusaResponse<MedusaProduct>>(
      `/store/products?${params.toString()}`
    );
    return data.products?.[0] || null;
  } catch {
    console.error(`Failed to fetch product: ${handle}`);
    return null;
  }
}

export function getProductPrice(product: MedusaProduct): number {
  const variant = product.variants?.[0];
  if (!variant) return 0;

  if (variant.calculated_price) {
    return variant.calculated_price.calculated_amount / 100;
  }

  const eurPrice = variant.prices?.find((p) => p.currency_code === "eur");
  return eurPrice ? eurPrice.amount / 100 : 0;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Local product images live under /public/products/<handle>.png
// We prefer the local file so product pages keep working even if an
// external supplier CDN blocks hotlinks or changes URLs.
const LOCAL_PRODUCT_IMAGES: Record<string, string> = {
  "marstek-venus-a": "/products/marstek-venus-a.png",
  "marstek-venus-ev3": "/products/marstek-venus-ev3.png",
  "marstek-venus-ev35": "/products/marstek-venus-ev35.png",
  "solplanet-phase-1-batterij": "/products/solplanet-phase-1-batterij.png",
  "solplanet-phase-3-batterij": "/products/solplanet-phase-3-batterij.png",
  "solplanet-omvormers": "/products/solplanet-omvormers.png",
  "container-batterij-zakelijk": "/products/container-batterij-zakelijk.png",
  "zonnepanelen": "/products/zonnepanelen.png",
  "laadpalen": "/products/laadpalen.png",
  "hyxipower-1fase": "/products/hyxipower-1fase.png",
  "hyxipower-3fase": "/products/hyxipower-3fase.png",
};

export function getProductImage(
  handle: string | undefined,
  remoteFallback?: string
): string {
  if (handle && LOCAL_PRODUCT_IMAGES[handle]) {
    return LOCAL_PRODUCT_IMAGES[handle];
  }
  return remoteFallback || "";
}

// --- Cart / Order helpers (server-side only, used in API routes) ---

async function medusaStoreRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  const res = await fetch(`${MEDUSA_BACKEND_URL}${path}`, {
    ...init,
    headers: {
      "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    signal: controller.signal,
    cache: "no-store",
  });

  clearTimeout(timeout);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Medusa API ${res.status}: ${text.slice(0, 200)}`);
  }

  return res.json() as Promise<T>;
}

export async function createMedusaCart(input: {
  email: string;
  items: { variantId: string; quantity: number }[];
  shippingAddress?: {
    first_name: string;
    last_name: string;
    address_1: string;
    postal_code: string;
    city: string;
    country_code: string;
    phone?: string;
  };
}): Promise<{ id: string } | null> {
  try {
    const data = await medusaStoreRequest<{ cart: { id: string } }>(
      `/store/carts`,
      {
        method: "POST",
        body: JSON.stringify({
          region_id: MEDUSA_REGION_ID,
          email: input.email,
          items: input.items.map((i) => ({
            variant_id: i.variantId,
            quantity: i.quantity,
          })),
          shipping_address: input.shippingAddress,
        }),
      }
    );
    return { id: data.cart.id };
  } catch (err) {
    console.error("Medusa createCart error:", err);
    return null;
  }
}

export async function completeMedusaCart(
  cartId: string
): Promise<{ orderId: string } | null> {
  try {
    const data = await medusaStoreRequest<{
      type?: string;
      order?: { id: string };
      cart?: { id: string };
    }>(`/store/carts/${cartId}/complete`, { method: "POST" });

    if (data.order?.id) return { orderId: data.order.id };
    return null;
  } catch (err) {
    console.error("Medusa completeCart error:", err);
    return null;
  }
}

export function getVariantId(product: MedusaProduct): string | null {
  return product.variants?.[0]?.id || null;
}

export type { MedusaProduct };
