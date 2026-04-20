"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export interface WebshopProduct {
  slug: string;
  name: string;
  description: string;
  price: number;
  priceDisplay: string;
  badge: string;
  badgeStyle: string;
  image: string;
}

type Category = "all" | "batterijen" | "omvormers" | "zonnepanelen" | "laadpalen";
type Segment = "all" | "particulier" | "zakelijk";
type Brand = "all" | "marstek" | "solplanet" | "hyxipower" | "alterion";

// Slug-based category mapping. Keep in sync with product handles in Medusa.
const CATEGORY_BY_SLUG: Record<string, Exclude<Category, "all">> = {
  "marstek-venus-a": "batterijen",
  "marstek-venus-ev3": "batterijen",
  "marstek-venus-ev35": "batterijen",
  "solplanet-phase-1-batterij": "batterijen",
  "solplanet-phase-3-batterij": "batterijen",
  "container-batterij-zakelijk": "batterijen",
  "solplanet-omvormers": "omvormers",
  "zonnepanelen": "zonnepanelen",
  "laadpalen": "laadpalen",
  "hyxipower-1fase": "omvormers",
  "hyxipower-3fase": "omvormers",
};

const SEGMENT_BY_SLUG: Record<string, Exclude<Segment, "all">> = {
  "container-batterij-zakelijk": "zakelijk",
  "solplanet-phase-3-batterij": "zakelijk",
  "marstek-venus-a": "particulier",
  "marstek-venus-ev3": "particulier",
  "marstek-venus-ev35": "particulier",
  "solplanet-phase-1-batterij": "particulier",
  "solplanet-omvormers": "particulier",
  "zonnepanelen": "particulier",
  "laadpalen": "particulier",
  "hyxipower-1fase": "particulier",
  "hyxipower-3fase": "zakelijk",
};

const CATEGORY_LABELS: Record<Exclude<Category, "all">, string> = {
  batterijen: "Batterijen",
  omvormers: "Omvormers",
  zonnepanelen: "Zonnepanelen",
  laadpalen: "Laadpalen",
};

// Brand mapping per product handle. Nieuwe merken hier toevoegen.
const BRAND_BY_SLUG: Record<string, Exclude<Brand, "all">> = {
  "marstek-venus-a": "marstek",
  "marstek-venus-ev3": "marstek",
  "marstek-venus-ev35": "marstek",
  "solplanet-phase-1-batterij": "solplanet",
  "solplanet-phase-3-batterij": "solplanet",
  "solplanet-omvormers": "solplanet",
  "zonnepanelen": "solplanet",
  "laadpalen": "solplanet",
  "container-batterij-zakelijk": "alterion",
  "hyxipower-1fase": "hyxipower",
  "hyxipower-3fase": "hyxipower",
};

const BRAND_LABELS: Record<Exclude<Brand, "all">, string> = {
  marstek: "Marstek",
  solplanet: "Solplanet",
  hyxipower: "Hyxipower",
  alterion: "Alterion",
};

export default function WebshopFilters({ products }: { products: WebshopProduct[] }) {
  const [category, setCategory] = useState<Category>("all");
  const [segment, setSegment] = useState<Segment>("all");
  const [brand, setBrand] = useState<Brand>("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const productCat = CATEGORY_BY_SLUG[p.slug];
      const productSeg = SEGMENT_BY_SLUG[p.slug];
      const productBrand = BRAND_BY_SLUG[p.slug];
      if (category !== "all" && productCat !== category) return false;
      if (segment !== "all" && productSeg !== segment) return false;
      if (brand !== "all" && productBrand !== brand) return false;
      return true;
    });
  }, [products, category, segment, brand]);

  return (
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
                  <input
                    type="radio"
                    name="category"
                    checked={category === "all"}
                    onChange={() => setCategory("all")}
                    className="text-primary focus:ring-primary"
                  />
                  Alle producten
                </label>
                {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((c) => (
                  <label key={c} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input
                      type="radio"
                      name="category"
                      checked={category === c}
                      onChange={() => setCategory(c)}
                      className="text-primary focus:ring-primary"
                    />
                    {CATEGORY_LABELS[c]}
                  </label>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Merk</p>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value as Brand)}
                className="w-full p-2 rounded-md border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">Alle merken</option>
                {(Object.keys(BRAND_LABELS) as Array<keyof typeof BRAND_LABELS>).map((b) => (
                  <option key={b} value={b}>
                    {BRAND_LABELS[b]}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Type</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                  <input
                    type="radio"
                    name="segment"
                    checked={segment === "all"}
                    onChange={() => setSegment("all")}
                    className="text-primary focus:ring-primary"
                  />
                  Alle
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                  <input
                    type="radio"
                    name="segment"
                    checked={segment === "particulier"}
                    onChange={() => setSegment("particulier")}
                    className="text-primary focus:ring-primary"
                  />
                  Particulier
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                  <input
                    type="radio"
                    name="segment"
                    checked={segment === "zakelijk"}
                    onChange={() => setSegment("zakelijk")}
                    className="text-primary focus:ring-primary"
                  />
                  Zakelijk
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
            <button
              onClick={() => setCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                category === "all"
                  ? "bg-secondary text-white"
                  : "bg-white border border-slate-200 text-secondary hover:border-primary"
              }`}
            >
              Alle producten
            </button>
            {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  category === c
                    ? "bg-secondary text-white"
                    : "bg-white border border-slate-200 text-secondary hover:border-primary"
                }`}
              >
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-500">{filtered.length} {filtered.length === 1 ? "product" : "producten"}</p>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-100 p-12 text-center">
            <span className="material-symbols-outlined text-slate-300 text-5xl mb-4 block">search_off</span>
            <p className="text-slate-600 font-semibold mb-1">Geen producten gevonden</p>
            <p className="text-slate-400 text-sm">Probeer een andere filtercombinatie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((product) => (
              <div
                key={product.slug}
                className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <Link href={`/webshop/${product.slug}`}>
                  <div className="relative h-52 w-full bg-slate-100 flex items-center justify-center p-6 overflow-hidden">
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`${product.badgeStyle} text-[10px] font-black uppercase px-2 py-1 rounded`}>
                        {product.badge}
                      </span>
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
                          <span className="text-slate-500 text-sm font-semibold uppercase tracking-wide">
                            Prijs op aanvraag
                          </span>
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
        )}
      </div>
    </div>
  );
}
