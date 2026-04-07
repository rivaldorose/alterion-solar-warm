import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductByHandle, getProductPrice, formatPrice } from "@/lib/medusa";

export const revalidate = 300; // revalidate every 5 minutes

interface Props {
  params: Promise<{ slug: string }>;
}

const productDetails: Record<string, { capacity: string; power: string; weight: string }> = {
  "thuisbatterij-lite": { capacity: "5 kWh", power: "2.5 kW", weight: "45 kg" },
  "thuisbatterij-pro": { capacity: "10 kWh", power: "5.0 kW", weight: "94 kg" },
  "thuisbatterij-max": { capacity: "20 kWh", power: "10.0 kW", weight: "150 kg" },
};

const fallbackData: Record<string, { title: string; description: string; price: number; image: string }> = {
  "thuisbatterij-lite": {
    title: "Thuisbatterij Lite",
    description: "Compacte opslag (5kWh) voor kleinere huishoudens en appartementen. Ideaal als instapmodel voor slim energiebeheer.",
    price: 2499,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDYQOvNfAzDQrUUtlXVWBr6_OSf4gevdOi2w7V3tcKulAcxT8CIhELEVOUnsyD01vRvvYlu-Y2WgAWdabJs6WsgUZifk6iZQ71gSLYDXJqZzVOiUdmQeqKENdq9aCSpcAPtevTpdgj-Hv_BJRTAyjY9y6YSgx5LoS0DBVWunu399j54NW1yUgxv6f7yX8IZ5kwfe__nT2eLWlJYt2VzxhVNc-5ew5BaeltRPl9QqN9nRcXFzI-brHXr8cv77j3w1pRzWkCJ9aPTOiu",
  },
  "thuisbatterij-pro": {
    title: "Thuisbatterij Pro",
    description: "De ideale balans (10kWh) voor het gemiddelde gezin met zonnepanelen. AI-gestuurd energiebeheer voor maximale besparing.",
    price: 4599,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcKsNhQWiLRyOe5H8Q3I0dvtlk9j4MjjCXL83PXgNCiApFJ55LtXcJ7fSW-wppiEZyt8NMFj3gys445zK1Myay_sbieDrtQpgji7XuEgCPnAAbQwomRZ2a0_mAcfFDlx8ustugGrPmXLwsk2-v39cpvfpckvt8Ou8IuGwbcs0PK_wYIVtuaDScHevNhm0AK-SzsLudEHuFTOgWwWLQoO_T2m96HnGTxsDoER_gVyUssHW8BMNYNkFswOweLLYQmGSRbyYUABu6s3Ey",
  },
  "thuisbatterij-max": {
    title: "Thuisbatterij Max",
    description: "Maximale capaciteit (20kWh+) voor volledige energie-onafhankelijkheid. De ultieme oplossing voor grote woningen.",
    price: 7299,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdoiAWs5cTm_w4U4CYjhtFK-MHIFW1qSDpkhFo2hnyP4bYox_con-DugIDhw835ozargle4-0VvjMVPRfPt_4sOxUxRWZBcATw14UTsJrody_lVbv2E6ZDlBa5kX8SpM7ieprD4uYoOb_kLJc05XJniwwxtojKNuqgcVnOnyAx59IPdZbLy-CyODY9_gJ70dFiWGluF1jmdy10VjhKhL_guRdXJSBNAIazCVXTVBeoWSHDiVqMFz-X0OsuIZEvtSywjyC6mgewNVIq",
  },
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const medusaProduct = await getProductByHandle(slug);

  const title = medusaProduct?.title || fallbackData[slug]?.title || "Product";
  const description = medusaProduct?.description || fallbackData[slug]?.description || "";
  const price = medusaProduct ? getProductPrice(medusaProduct) : (fallbackData[slug]?.price || 0);
  const image = medusaProduct?.images?.[0]?.url || fallbackData[slug]?.image || "";
  const specs = productDetails[slug] || { capacity: "10 kWh", power: "5.0 kW", weight: "94 kg" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-secondary">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/webshop" className="hover:text-secondary">Thuisbatterijen</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-secondary font-medium">{title}</span>
      </nav>

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Product Image */}
        <div className="bg-neutral-gray rounded-xl overflow-hidden flex items-center justify-center min-h-[500px] relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={title}
            className="max-w-md w-full drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            src={image}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded">PREMIUM</span>
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded">OP VOORRAAD</span>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-primary">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star_half</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">(48 reviews)</span>
            </div>
            <h1 className="text-4xl font-black text-secondary mb-4 tracking-tight">{title}</h1>
            {price > 0 ? (
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-3xl font-bold text-secondary">{formatPrice(price)}</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-2xl font-bold text-secondary">Prijs op aanvraag</span>
              </div>
            )}
            <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
            {price > 0 && (
              <div className="flex items-center gap-2 mb-8">
                <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-emerald-600">Direct leverbaar uit voorraad</span>
              </div>
            )}
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">battery_charging_full</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Capaciteit</p>
                <p className="text-sm font-bold text-secondary">{specs.capacity}</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">bolt</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Vermogen</p>
                <p className="text-sm font-bold text-secondary">{specs.power}</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          {price > 0 ? (
            <AddToCartButton
              slug={slug}
              name={title}
              price={price}
              image={image}
            />
          ) : (
            <Link
              href={`/contact?product=${encodeURIComponent(title)}`}
              className="w-full bg-secondary text-white font-bold py-4 px-6 rounded-lg text-center text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">mail</span>
              Offerte aanvragen
            </Link>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-16">
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
          <button className="px-8 py-4 text-sm font-bold text-secondary border-b-2 border-primary whitespace-nowrap">Beschrijving</button>
          <button className="px-8 py-4 text-sm font-bold text-slate-400 border-b-2 border-transparent hover:text-secondary whitespace-nowrap">Specificaties</button>
          <button className="px-8 py-4 text-sm font-bold text-slate-400 border-b-2 border-transparent hover:text-secondary whitespace-nowrap">Reviews (48)</button>
          <button className="px-8 py-4 text-sm font-bold text-slate-400 border-b-2 border-transparent hover:text-secondary whitespace-nowrap">Installatie</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-secondary mb-4">Energiebeheer van de toekomst</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              De {title} is niet zomaar een batterij; het is het hart van uw slimme woning. Door gebruik te maken van geavanceerde LFP (Lithium-ijzer-fosfaat) technologie, garanderen wij een levensduur van meer dan 15 jaar en een veiligheidsprofiel dat onge&euml;venaard is in de industrie.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-600">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Eenvoudige integratie met alle bestaande zonnepaneel-omvormers.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Real-time monitoring via de gratis Alterion App.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-600">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span>Slim laden op basis van dynamische energietarieven.</span>
              </li>
            </ul>
          </div>
          <div className="bg-secondary rounded-xl p-8 text-white">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span>
              Technische Specs
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Type</span>
                <span className="font-medium">LFP (LiFePO4)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Capaciteit</span>
                <span className="font-medium">{specs.capacity}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Vermogen</span>
                <span className="font-medium">{specs.power}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">IP Waarde</span>
                <span className="font-medium">IP65 (Buitenmontage)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Garantie</span>
                <span className="font-medium">10 Jaar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Gewicht</span>
                <span className="font-medium">{specs.weight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
