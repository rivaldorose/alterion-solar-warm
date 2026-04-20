import Image from "next/image";
import Link from "next/link";
import BrandIcon from "@/components/BrandIcon";
import CertificatenSection from "@/components/CertificatenSection";

export const metadata = {
  title: "Over Ons – Alterion",
  description: "Leer meer over Alterion en ons team.",
};

export default function OverOnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-primary font-bold uppercase tracking-widest text-sm">Over Alterion</p>
            <h1 className="text-4xl lg:text-6xl font-black text-secondary leading-[1.1] tracking-tight">
              Over Alterion
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Sinds 2020 is Alterion jouw betrouwbare partner in duurzame energie. Wij leveren hoogwaardige zonne-energieoplossingen die zowel het milieu als uw energierekening aanzienlijk verlagen.
            </p>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Met meer dan 5 jaar ervaring en een team van deskundige monteurs bieden wij professionele installaties van zonnepanelen en thuisbatterijen tegen scherpe prijzen. Bij ons staan klanttevredenheid en transparante communicatie centraal, zodat u met een gerust hart kunt kiezen voor een duurzame investering.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <Image
              alt="Het Alterion team"
              className="w-full aspect-[4/3] object-cover"
              src="/hero-home.jpg"
              width={800}
              height={600}
            />
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="py-24 bg-neutral-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { icon: "construction", title: "Professionele installaties" },
              { icon: "payments", title: "Financieringsopties" },
              { icon: "workspace_premium", title: "5+ jaar ervaring" },
              { icon: "verified_user", title: "Lange garanties" },
              { icon: "support_agent", title: "Klantenservice & ondersteuning" },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                <span className="material-symbols-outlined text-primary text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waarom Alterion */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-secondary tracking-tight">Eerlijk over duurzaamheid en kwaliteit</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              Kies voor Alterion en ervaar eerlijke, betrouwbare en kwalitatieve service. Wij bieden complete ontzorging, van advies tot installatie van thuisbatterijen, zonnepanelen en laadpalen.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">engineering</span>
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-3">Eigen Installateurs</h3>
              <p className="text-slate-600 leading-relaxed">
                Geen onderaannemers. Onze eigen gecertificeerde vakmensen installeren en onderhouden elk systeem.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">verified</span>
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-3">Kwaliteitsgarantie</h3>
              <p className="text-slate-600 leading-relaxed">
                Wij werken uitsluitend met hoogwaardige producten en bieden lange garanties op al onze installaties.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">handshake</span>
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-3">Persoonlijk Contact</h3>
              <p className="text-slate-600 leading-relaxed">
                Van adviesgesprek tot installatie en nazorg — u heeft altijd een vast aanspreekpunt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CertificatenSection />

      {/* Werkwijze */}
      <section className="py-24 bg-neutral-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-secondary tracking-tight">Onze werkwijze</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">In 4 stappen naar uw duurzame installatie</p>
          </div>
          {(() => {
            const steps = [
              { step: "1", icon: "chat", title: "Adviesgesprek", desc: "Gratis en vrijblijvend bespreken we uw situatie en wensen." },
              { step: "2", icon: "calculate", title: "Offerte op maat", desc: "U ontvangt een persoonlijke offerte met exacte besparingen." },
              { step: "3", icon: "construction", title: "Installatie", desc: "Onze vakmensen installeren alles binnen één werkdag." },
              { step: "4", icon: "monitoring", title: "Monitoring", desc: "Via de app heeft u realtime inzicht in uw besparing." },
            ];
            return (
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-y-8 md:gap-x-4 items-stretch">
                {steps.map((item, i) => (
                  <div key={item.step} className="contents">
                    <div className="relative bg-white p-8 rounded-xl">
                      <span className="absolute -top-4 left-6 bg-primary text-secondary font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">
                        {item.step}
                      </span>
                      <span className="material-symbols-outlined text-primary text-3xl mb-4 block mt-2">{item.icon}</span>
                      <h3 className="text-base font-semibold text-secondary mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:flex items-center justify-center text-primary" aria-hidden="true">
                        <span className="material-symbols-outlined text-3xl">chevron_right</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-lg text-slate-600 mb-8">
            Klaar voor duurzame energie? Wij helpen u graag verder.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-secondary font-bold px-10 py-5 rounded-lg text-lg hover:brightness-105 transition-all inline-flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <BrandIcon size={22} />
            Vraag advies aan
          </Link>
        </div>
      </section>
    </>
  );
}
