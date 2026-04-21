import Image from "next/image";
import Link from "next/link";
import Calculator from "@/components/Calculator";
import BrandIcon from "@/components/BrandIcon";
import BatteryInfoPopup from "@/components/BatteryInfoPopup";

const partners = [
  { name: "Alliander", src: "/partners/alliander.png", url: "https://www.alliander.com" },
  { name: "Enexis", src: "/partners/enexis.png", url: "https://www.enexis.nl" },
  { name: "Liander", src: "/partners/liander.png", url: "https://www.liander.nl" },
  { name: "Netbeheer NL", src: "/partners/netbeheernl.png", url: "https://www.netbeheernederland.nl" },
  { name: "Rijksoverheid", src: "/partners/rijksoverheid.png", url: "https://www.rijksoverheid.nl" },
  { name: "RVO", src: "/partners/rvo.png", url: "https://www.rvo.nl" },
  { name: "Stedin", src: "/partners/stedin.png", url: "https://www.stedin.net" },
  { name: "TenneT", src: "/partners/tennet.png", url: "https://www.tennet.eu/nl" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-primary font-bold uppercase tracking-widest text-sm">Duurzame energie</p>
            <h1 className="font-poppins text-5xl lg:text-7xl font-extrabold text-secondary leading-[1.05] tracking-tight">
              Thuisbatterijen die werken
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Bespaar op uw energierekening met de slimme thuisbatterijen van Alterion. Duurzaam, effici&euml;nt en klaar voor de toekomst van energie.
            </p>
            <BatteryInfoPopup />
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#calculator"
                className="bg-primary text-secondary font-bold px-8 py-4 rounded-lg text-lg hover:brightness-105 transition-all text-center inline-flex items-center justify-center gap-2"
              >
                <BrandIcon size={20} />
                Bereken uw voordeel
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <Image
                alt="Alterion thuisbatterij in een garage naast een elektrische auto"
                className="w-full aspect-square object-cover"
                src="/thuisbatterij-garage.jpg"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - Auto Scroll */}
      <section className="py-12 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest">Onze partners</p>
        </div>
        <div className="relative">
          <div className="flex animate-scroll gap-16 w-max hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((partner, i) => (
              <a
                key={i}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Bezoek ${partner.name}`}
                className="flex items-center justify-center h-12 min-w-[120px] opacity-90 hover:opacity-100 hover:scale-105 transition-all"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={120}
                  height={48}
                  className="h-8 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">home</span>
              <h3 className="text-xl font-bold text-secondary mb-3">Slimme Woning</h3>
              <p className="text-slate-600 leading-relaxed">Integreer uw batterij naadloos met uw bestaande smart home systeem voor optimaal beheer.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">battery_charging_full</span>
              <h3 className="text-xl font-bold text-secondary mb-3">Maximale Opslag</h3>
              <p className="text-slate-600 leading-relaxed">De hoogste energiedichtheid in de markt, waardoor u minder ruimte nodig heeft voor meer vermogen.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">wb_sunny</span>
              <h3 className="text-xl font-bold text-secondary mb-3">Zonne-energie</h3>
              <p className="text-slate-600 leading-relaxed">Maak optimaal gebruik van uw panelen door overdag op te slaan en &apos;s avonds gratis te verbruiken.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">euro</span>
              <h3 className="text-xl font-bold text-secondary mb-3">Bespaar Euro&apos;s</h3>
              <p className="text-slate-600 leading-relaxed">Verlaag direct uw maandelijkse energielasten en wees onafhankelijk van stijgende stroomprijzen.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">verified</span>
              <h3 className="text-xl font-bold text-secondary mb-3">Garantie</h3>
              <p className="text-slate-600 leading-relaxed">Standaard 10 jaar volledige garantie op al onze systemen. Zorgeloos investeren in uw toekomst.</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">bolt</span>
              <h3 className="text-xl font-bold text-secondary mb-3">Snel Geplaatst</h3>
              <p className="text-slate-600 leading-relaxed">Onze gecertificeerde installateurs plaatsen en configureren het systeem binnen &eacute;&eacute;n werkdag.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <Calculator />

      {/* Product Section 1 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-black text-secondary mb-8">De slimste batterij van Nederland</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded">check</span>
                <p className="text-lg text-slate-600"><span className="font-bold text-secondary">AI-gestuurd:</span> Leert van uw verbruikspatroon om energie in te kopen op de goedkoopste momenten.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded">check</span>
                <p className="text-lg text-slate-600"><span className="font-bold text-secondary">Modulair:</span> Eenvoudig uit te breiden als uw gezin of energiebehoefte groeit.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded">check</span>
                <p className="text-lg text-slate-600"><span className="font-bold text-secondary">Design:</span> Een strakke, minimalistische behuizing die gezien mag worden.</p>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-xl">
            <Image
              alt="Alterion thuisbatterij gemonteerd aan de buitenmuur van een woning"
              className="w-full aspect-[4/3] object-cover"
              src="/thuisbatterij-aan-huis.jpg"
              width={800}
              height={600}
            />
          </div>
        </div>
      </section>

      {/* Product Section 2 */}
      <section className="py-24 bg-neutral-gray">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <Image
              alt="Installatie proces"
              className="w-full aspect-[4/3] object-cover"
              src="/instalateru.jpg"
              width={800}
              height={600}
            />
          </div>
          <div>
            <h2 className="text-4xl font-black text-secondary mb-6">Binnen &eacute;&eacute;n dag geplaatst</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Onze eigen gecertificeerde installateurs regelen alles van A tot Z. Geen onderaannemers, geen gedoe. We laten uw huis net zo schoon achter als we het vonden.
            </p>
            <Link href="/over-ons" className="bg-primary text-secondary font-bold px-8 py-4 rounded-lg text-lg hover:brightness-105 transition-all inline-flex items-center gap-2">
              <BrandIcon size={20} />
              Ontdek onze werkwijze
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
