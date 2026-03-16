import Image from "next/image";
import Link from "next/link";

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
              Wij versnellen de energietransitie
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Alterion maakt duurzame energie toegankelijk voor iedereen. Met onze slimme thuisbatterijen helpen wij huishoudens om onafhankelijk te worden van het energienet en hun energiekosten drastisch te verlagen.
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

      {/* Missie & Visie */}
      <section className="py-24 bg-neutral-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-100">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">flag</span>
              <h2 className="text-2xl font-black text-secondary mb-4">Onze Missie</h2>
              <p className="text-slate-600 leading-relaxed">
                Wij geloven dat ieder huishouden toegang moet hebben tot slimme energieopslag. Door innovatieve technologie betaalbaar en toegankelijk te maken, dragen wij bij aan een duurzamere wereld waarin energie eerlijk verdeeld wordt.
              </p>
            </div>
            <div className="bg-white p-10 rounded-xl shadow-sm border border-slate-100">
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">visibility</span>
              <h2 className="text-2xl font-black text-secondary mb-4">Onze Visie</h2>
              <p className="text-slate-600 leading-relaxed">
                Een toekomst waarin elk huis zijn eigen energiecentrale is. Waar zonnepanelen en thuisbatterijen samenwerken om huishoudens volledig energie-onafhankelijk te maken, zonder concessies aan comfort of gemak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waarom Alterion */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-secondary">Waarom Alterion?</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Wat ons onderscheidt van de rest</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">engineering</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Eigen Installateurs</h3>
              <p className="text-slate-600 leading-relaxed">
                Geen onderaannemers. Onze eigen gecertificeerde vakmensen installeren en onderhouden elk systeem.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">smart_toy</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">AI-Gestuurd</h3>
              <p className="text-slate-600 leading-relaxed">
                Onze batterijen leren van uw verbruikspatroon en kopen energie in op de goedkoopste momenten.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">handshake</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Persoonlijk Contact</h3>
              <p className="text-slate-600 leading-relaxed">
                Van adviesgesprek tot installatie en nazorg — u heeft altijd een vast aanspreekpunt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cijfers */}
      <section className="py-24 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-black text-primary mb-2">500+</p>
              <p className="text-slate-400 font-medium">Installaties</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-primary mb-2">98%</p>
              <p className="text-slate-400 font-medium">Klanttevredenheid</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-primary mb-2">10</p>
              <p className="text-slate-400 font-medium">Jaar Garantie</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-primary mb-2">1 dag</p>
              <p className="text-slate-400 font-medium">Installatietijd</p>
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-secondary">Onze Werkwijze</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">In 4 stappen naar uw thuisbatterij</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", icon: "chat", title: "Adviesgesprek", desc: "Gratis en vrijblijvend bespreken we uw situatie en wensen." },
              { step: "2", icon: "calculate", title: "Offerte op maat", desc: "U ontvangt een persoonlijke offerte met exacte besparingen." },
              { step: "3", icon: "construction", title: "Installatie", desc: "Onze vakmensen installeren alles binnen één werkdag." },
              { step: "4", icon: "monitoring", title: "Monitoring", desc: "Via de app heeft u realtime inzicht in uw besparing." },
            ].map((item) => (
              <div key={item.step} className="relative bg-neutral-gray p-8 rounded-xl">
                <span className="absolute -top-4 left-6 bg-primary text-secondary font-black text-sm w-8 h-8 rounded-full flex items-center justify-center">
                  {item.step}
                </span>
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block mt-2">{item.icon}</span>
                <h3 className="text-lg font-bold text-secondary mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-gray">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-secondary mb-6">Klaar om te besparen?</h2>
          <p className="text-lg text-slate-600 mb-10">
            Neem contact op voor een vrijblijvend adviesgesprek en ontdek hoeveel u kunt besparen met een Alterion thuisbatterij.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-secondary font-bold px-10 py-5 rounded-lg text-lg hover:brightness-105 transition-all inline-block shadow-lg shadow-primary/20"
          >
            Neem contact op
          </Link>
        </div>
      </section>
    </>
  );
}
