import { getProducts, getProductPrice, formatPrice, getProductImage, MedusaProduct } from "@/lib/medusa";
import WebshopFilters, { WebshopProduct } from "@/components/WebshopFilters";

export const revalidate = 300; // revalidate every 5 minutes

export const metadata = {
  title: "Webshop – Alterion",
  description: "Bekijk ons productaanbod voor thuisbatterijen en energieoplossingen.",
};

const fallbackProducts: WebshopProduct[] = [
  {
    slug: "hyxipower-1fase",
    name: "Hyxipower 1-fase omvormer",
    description: "1-fase hybride omvormer voor particuliere installaties. Compatible met zonnepanelen en batterij.",
    price: 0,
    priceDisplay: "Op aanvraag",
    badge: "Nieuw",
    badgeStyle: "bg-primary text-secondary",
    image: "/products/hyxipower-1fase.png",
  },
  {
    slug: "hyxipower-3fase",
    name: "Hyxipower 3-fase omvormer",
    description: "3-fase hybride omvormer voor zakelijke installaties en grotere woningen. Hoog vermogen.",
    price: 0,
    priceDisplay: "Op aanvraag",
    badge: "Zakelijk",
    badgeStyle: "bg-secondary text-primary border border-primary",
    image: "/products/hyxipower-3fase.png",
  },
  {
    slug: "lanpwr-2500w-eu",
    name: "LANPWR-2500W EU",
    description: "Draagbare power station, 2048Wh LiFePO4, 2500W output. Ideaal als back-up of mobiele energiebron.",
    price: 0,
    priceDisplay: "Op aanvraag",
    badge: "Nieuw",
    badgeStyle: "bg-primary text-secondary",
    image: "/products/lanpwr-2500w.png",
  },
  {
    slug: "marstek-venus-a",
    name: "Marstek Venus A",
    description: "Hybride thuisbatterij met 2.12 kWh opslag, 1.5 kW omvormer. LiFePO4, 10 jaar garantie.",
    price: 3750,
    priceDisplay: "€3.750",
    badge: "Nieuw",
    badgeStyle: "bg-primary text-secondary",
    image: "/products/marstek-venus-a.png",
  },
  {
    slug: "marstek-venus-ev3",
    name: "Marstek Venus EV3",
    description: "Plug & Play thuisbatterij met 5.12 kWh opslag. Schaalbaar tot 15.36 kWh. Incl. P1 meter.",
    price: 1299,
    priceDisplay: "€1.299",
    badge: "Populairste",
    badgeStyle: "bg-secondary text-primary border border-primary",
    image: "/products/marstek-venus-ev3.png",
  },
  {
    slug: "marstek-venus-ev35",
    name: "Marstek Venus EV3.5",
    description: "Uitgebreide thuisbatterij met 15.36 kWh opslag en 7.5 kW vermogen. Maximale onafhankelijkheid.",
    price: 3499,
    priceDisplay: "€3.499",
    badge: "Premium",
    badgeStyle: "bg-primary text-secondary",
    image: "/products/marstek-venus-ev35.png",
  },
];

const badges: Record<string, { text: string; style: string }> = {
  "marstek-venus-a": { text: "Nieuw", style: "bg-primary text-secondary" },
  "marstek-venus-ev3": { text: "Populairste", style: "bg-secondary text-primary border border-primary" },
  "marstek-venus-ev35": { text: "Premium", style: "bg-primary text-secondary" },
};

function mapMedusaProduct(product: MedusaProduct): WebshopProduct {
  const price = getProductPrice(product);
  const badge = badges[product.handle] || { text: "Nieuw", style: "bg-primary text-secondary" };
  return {
    slug: product.handle,
    name: product.title,
    description: product.description || "",
    price,
    priceDisplay: formatPrice(price),
    badge: badge.text,
    badgeStyle: badge.style,
    image: getProductImage(product.handle, product.images?.[0]?.url),
  };
}

export default async function WebshopPage() {
  const medusaProducts = await getProducts();
  const mapped = medusaProducts.map(mapMedusaProduct);

  // Hyxipower items staan (nog) niet in MedusaJS — voeg ze altijd toe zolang
  // ze niet als handle in de Medusa-response staan.
  const mappedSlugs = new Set(mapped.map((p) => p.slug));
  const extraProductSlugs = ["hyxipower-1fase", "hyxipower-3fase", "lanpwr-2500w-eu"];
  const hyxiExtras = fallbackProducts.filter(
    (p) => extraProductSlugs.includes(p.slug) && !mappedSlugs.has(p.slug)
  );

  const products: WebshopProduct[] =
    mapped.length > 0 ? [...hyxiExtras, ...mapped] : fallbackProducts;

  return (
    <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 py-8">
      <div className="flex flex-col gap-3 mb-10">
        <p className="text-primary font-bold uppercase tracking-widest text-sm">Webshop</p>
        <h1 className="font-poppins text-secondary text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
          Onze producten
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
          Ontdek de perfecte thuisbatterij voor uw energiebehoeften. Duurzaam, effici&euml;nt en klaar voor de toekomst.
        </p>
      </div>

      <WebshopFilters products={products} />
    </div>
  );
}
