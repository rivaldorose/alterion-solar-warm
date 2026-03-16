import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata = {
  title: "Webshop – Alterion",
  description: "Bekijk ons productaanbod voor thuisbatterijen en energieoplossingen.",
};

const products = [
  {
    slug: "thuisbatterij-lite",
    name: "Thuisbatterij Lite",
    description: "Compacte opslag (5kWh) voor kleinere huishoudens en appartementen.",
    price: 2499,
    priceDisplay: "€2.499",
    oldPrice: "€2.899",
    badge: "Best Seller",
    badgeStyle: "bg-primary text-secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBDYQOvNfAzDQrUUtlXVWBr6_OSf4gevdOi2w7V3tcKulAcxT8CIhELEVOUnsyD01vRvvYlu-Y2WgAWdabJs6WsgUZifk6iZQ71gSLYDXJqZzVOiUdmQeqKENdq9aCSpcAPtevTpdgj-Hv_BJRTAyjY9y6YSgx5LoS0DBVWunu399j54NW1yUgxv6f7yX8IZ5kwfe__nT2eLWlJYt2VzxhVNc-5ew5BaeltRPl9QqN9nRcXFzI-brHXr8cv77j3w1pRzWkCJ9aPTOiu",
  },
  {
    slug: "thuisbatterij-pro",
    name: "Thuisbatterij Pro",
    description: "De ideale balans (10kWh) voor het gemiddelde gezin met zonnepanelen.",
    price: 4599,
    priceDisplay: "€4.599",
    oldPrice: null,
    badge: "Populairste",
    badgeStyle: "bg-secondary text-primary border border-primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcKsNhQWiLRyOe5H8Q3I0dvtlk9j4MjjCXL83PXgNCiApFJ55LtXcJ7fSW-wppiEZyt8NMFj3gys445zK1Myay_sbieDrtQpgji7XuEgCPnAAbQwomRZ2a0_mAcfFDlx8ustugGrPmXLwsk2-v39cpvfpckvt8Ou8IuGwbcs0PK_wYIVtuaDScHevNhm0AK-SzsLudEHuFTOgWwWLQoO_T2m96HnGTxsDoER_gVyUssHW8BMNYNkFswOweLLYQmGSRbyYUABu6s3Ey",
  },
  {
    slug: "thuisbatterij-max",
    name: "Thuisbatterij Max",
    description: "Maximale capaciteit (20kWh+) voor volledige energie-onafhankelijkheid.",
    price: 7299,
    priceDisplay: "€7.299",
    oldPrice: null,
    badge: "Premium",
    badgeStyle: "bg-primary text-secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdoiAWs5cTm_w4U4CYjhtFK-MHIFW1qSDpkhFo2hnyP4bYox_con-DugIDhw835ozargle4-0VvjMVPRfPt_4sOxUxRWZBcATw14UTsJrody_lVbv2E6ZDlBa5kX8SpM7ieprD4uYoOb_kLJc05XJniwwxtojKNuqgcVnOnyAx59IPdZbLy-CyODY9_gJ70dFiWGluF1jmdy10VjhKhL_guRdXJSBNAIazCVXTVBeoWSHDiVqMFz-X0OsuIZEvtSywjyC6mgewNVIq",
  },
];

export default function WebshopPage() {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 py-8">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-secondary text-4xl md:text-5xl font-black tracking-tight">Onze Producten</h1>
        <p className="text-slate-600 text-lg max-w-2xl">Ontdek de perfecte thuisbatterij voor uw energiebehoeften. Duurzaam, effici&euml;nt en klaar voor de toekomst.</p>
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
                    <input className="rounded text-primary focus:ring-primary" type="checkbox" /> Laadpalen
                  </label>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Capaciteit</p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input className="rounded text-primary focus:ring-primary" type="checkbox" /> 5kWh - 10kWh
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input className="rounded text-primary focus:ring-primary" type="checkbox" /> 10kWh - 20kWh
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                    <input className="rounded text-primary focus:ring-primary" type="checkbox" /> 20kWh+
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
              <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-secondary text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">Lite Serie</button>
              <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-secondary text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">Pro Serie</button>
              <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-secondary text-sm font-semibold hover:border-primary transition-colors whitespace-nowrap">Max Serie</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.slug}
                className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <Link href={`/webshop/${product.slug}`}>
                  <div className="relative h-64 w-full bg-slate-100 flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`${product.badgeStyle} text-[10px] font-black uppercase px-2 py-1 rounded`}>{product.badge}</span>
                    </div>
                    <div
                      className="w-full h-full bg-center bg-no-repeat bg-contain transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url("${product.image}")` }}
                    ></div>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <Link href={`/webshop/${product.slug}`}>
                    <div className="mb-4">
                      <h3 className="text-secondary text-xl font-bold mb-1">{product.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{product.description}</p>
                    </div>
                  </Link>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex flex-col gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-secondary text-2xl font-black">{product.priceDisplay}</span>
                      {product.oldPrice && <span className="text-slate-400 text-xs line-through">{product.oldPrice}</span>}
                    </div>
                    <AddToCartButton
                      slug={product.slug}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      label="Bestel nu"
                    />
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
