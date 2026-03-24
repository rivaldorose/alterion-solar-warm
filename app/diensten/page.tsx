import DienstenCalculator from "@/components/DienstenCalculator";
import Image from "next/image";

export const metadata = {
  title: "Besparingscalculator – Alterion",
  description: "Bereken hoeveel je kunt besparen met een Alterion thuisbatterij.",
};

export default function CalculatorPage() {
  return (
    <div className="relative pb-24 overflow-hidden">
      {/* Organic Blobs Background */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h1 className="font-poppins font-black text-5xl md:text-6xl text-secondary mb-6">Ontdek je besparing</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Bereken in 3 eenvoudige stappen hoeveel je kunt besparen met een Alterion thuisbatterij en verhoog je energieonafhankelijkheid.
        </p>
      </section>

      {/* Calculator Container */}
      <section className="max-w-6xl mx-auto px-6">
        <DienstenCalculator />
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">A-Kwaliteit</h4>
            <p className="text-slate-500">Wij werken uitsluitend met de meest betrouwbare componenten en merken.</p>
          </div>
          <div className="p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">construction</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Eigen Installateurs</h4>
            <p className="text-slate-500">Vakkundige montage door onze eigen gecertificeerde Alterion experts.</p>
          </div>
          <div className="p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">eco</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Duurzame Impact</h4>
            <p className="text-slate-500">Versnel de energietransitie en verminder direct uw ecologische voetafdruk.</p>
          </div>
        </div>
      </section>

      {/* Visual Context Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="relative h-[400px] rounded-lg overflow-hidden group">
          <Image
            alt="Modern sustainable home"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            src="/hero-home.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-transparent flex items-center p-12">
            <div className="max-w-md">
              <h2 className="text-4xl font-poppins font-black text-white mb-6">Een slimme investering in uw toekomst.</h2>
              <div className="flex gap-4">
                <span className="bg-primary text-secondary px-4 py-2 rounded-full text-sm font-bold">LFP Technologie</span>
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold">10 Jaar Garantie</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
