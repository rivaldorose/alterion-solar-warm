import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { getProducts, getProductPrice, formatPrice, getProductImage, MedusaProduct } from "@/lib/medusa";

export const revalidate = 300; // revalidate every 5 minutes

export const metadata = {
  title: "Webshop – Alterion",
  description: "Bekijk ons productaanbod voor thuisbatterijen en energieoplossingen.",
};

const fallbackProducts = [
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

function mapMedusaProduct(product: MedusaProduct) {
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
  const products = medusaProducts.length > 0
    ? medusaProducts.map(mapMedusaProduct)
    : fallbackProducts;

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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">filter_list</span> Filters
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Categorie</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input defaultChecked className="rounded text-primary focus:ring-primary" type="checkbox" /> Thuisbatterijen
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input className="rounded text-primary focus:ring-primary" type="checkbox" /> Omvormers
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input className="rounded text-primary focus:ring-primary" type="checkbox" /> Zonnepanelen
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input className="rounded text-primary focus:ring-primary" type="checkbox" /> Laadpalen
                  </label>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Type</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input className="rounded text-primary focus:ring-primary" type="checkbox" /> Particulier
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input className="rounded text-primary focus:ring-primary" type="checkbox" /> Zakelijk
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button className="px-4 py-2 rounded-lg bg-secondary text-white text-sm font-semibold whitespace-nowrap">Alle Producten</button>
              <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-secondary text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">Batterijen</button>
              <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-secondary text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">Omvormers</button>
              <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-secondary text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">Zonnepanelen</button>
              <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-secondary text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">Laadpalen</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map((product) => (
              <div
                key={product.slug}
                className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <Link href={`/webshop/${product.slug}`}>
                  <div className="relative h-52 w-full bg-slate-100 flex items-center justify-center p-6 overflow-hidden">
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`${product.badgeStyle} text-[10px] font-black uppercase px-2 py-1 rounded`}>{product.badge}</span>
                    </div>
                    <div
                      className="w-full h-full bg-center bg-no-repeat bg-contain transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url("${product.image}")` }}
                    ></div>
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <Link href={`/webshop/${product.slug}`}>
                    <div className="mb-3">
                      <h3 className="text-secondary text-lg font-bold mb-1">{product.name}</h3>
                      <p className="text-slate-500 text-sm leading-snug">{product.description}</p>
                    </div>
                  </Link>
                  <div className="mt-auto pt-3 border-t border-slate-50 flex flex-col gap-3">
                    {product.price > 0 ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-secondary text-2xl font-black">{product.priceDisplay}</span>
                        </div>
                        <AddToCartButton
                          slug={product.slug}
                          name={product.name}
                          price={product.price}
                          image={product.image}
                          label="Bestel nu"
                        />
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Prijs op aanvraag</span>
                        </div>
                        <Link
                          href={`/contact?product=${encodeURIComponent(product.name)}`}
                          className="w-full bg-primary text-secondary font-bold py-3 px-6 rounded-lg text-center hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-sm shadow-primary/20"
                        >
                          <span className="material-symbols-outlined text-lg">request_quote</span>
                          Offerte aanvragen
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
