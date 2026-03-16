import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-secondary">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/webshop" className="hover:text-secondary">Thuisbatterijen</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-secondary font-medium">Home Power X1</span>
      </nav>

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Product Image */}
        <div className="bg-neutral-gray rounded-xl overflow-hidden flex items-center justify-center min-h-[500px] relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Alterion Home Power X1"
            className="max-w-md w-full drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxMYU0Q3XDAOCxKnti1YqVMTYAMh6HtTl3Vxhm3RAGfmBimQ2i8Xdrn_6rWhok0dncxgoA21Kbg2W3KxZlI_E3KrP5PTfRydKnbKrO5f1BmyheotOxAbw3Nx3LuWQ9A8BsabSZdnRG4zabLabAagCAbHduQl-8WlYiNw-4Yyfqjyd4n2NzqJKTpzfQxyJ0qJ_KxXBMmh_0Q55InW3JFD0H0TKg1RVVtHyplyCIz9fWYMIvtYaZwIykGuklkEnN-NE9X5mPSMTqG3Zi"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded">PREMIUM</span>
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded">BESTSELLER</span>
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
            <h1 className="text-4xl font-black text-secondary mb-4 tracking-tight">Alterion Home Power X1</h1>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-3xl font-bold text-secondary">€2.499,00</span>
              <span className="text-sm text-slate-500 line-through">€2.899,00</span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">
              De ultieme thuisbatterij voor maximale energie-onafhankelijkheid. Compact, krachtig en slim aangestuurd door AI om uw energiekosten tot 70% te verlagen.
            </p>
            <div className="flex items-center gap-2 mb-8">
              <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-emerald-600">Direct leverbaar uit voorraad</span>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">battery_charging_full</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Capaciteit</p>
                <p className="text-sm font-bold text-secondary">10.5 kWh</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">bolt</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Vermogen</p>
                <p className="text-sm font-bold text-secondary">5.0 kW</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <AddToCartButton
            slug={slug}
            name="Alterion Home Power X1"
            price={2499}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCxMYU0Q3XDAOCxKnti1YqVMTYAMh6HtTl3Vxhm3RAGfmBimQ2i8Xdrn_6rWhok0dncxgoA21Kbg2W3KxZlI_E3KrP5PTfRydKnbKrO5f1BmyheotOxAbw3Nx3LuWQ9A8BsabSZdnRG4zabLabAagCAbHduQl-8WlYiNw-4Yyfqjyd4n2NzqJKTpzfQxyJ0qJ_KxXBMmh_0Q55InW3JFD0H0TKg1RVVtHyplyCIz9fWYMIvtYaZwIykGuklkEnN-NE9X5mPSMTqG3Zi"
          />
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
              De Home Power X1 is niet zomaar een batterij; het is het hart van uw slimme woning. Door gebruik te maken van geavanceerde LFP (Lithium-ijzer-fosfaat) technologie, garanderen wij een levensduur van meer dan 15 jaar en een veiligheidsprofiel dat onge&euml;venaard is in de industrie.
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
                <span className="text-white/60">Ontladingsdiepte</span>
                <span className="font-medium">95%</span>
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
                <span className="font-medium">94 kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
