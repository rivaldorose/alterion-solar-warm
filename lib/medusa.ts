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

export type { MedusaProduct };
