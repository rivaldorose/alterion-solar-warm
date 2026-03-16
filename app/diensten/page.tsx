import Link from "next/link";

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
        <h1 className="font-poppins text-5xl md:text-6xl text-secondary mb-6">Ontdek je besparing</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Bereken in 3 eenvoudige stappen hoeveel je kunt besparen met een Alterion thuisbatterij en verhoog je energieonafhankelijkheid.
        </p>
      </section>

      {/* Calculator Container */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Input Panel */}
          <div className="flex-1 p-8 md:p-12">
            <div className="space-y-12">
              {/* Step 1 */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-secondary font-bold flex items-center justify-center">1</span>
                  <h3 className="text-xl font-semibold">Jouw Energieprofiel</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-500">Huidig jaarverbruik (kWh)</label>
                    <input className="w-full bg-background-light border-none rounded-lg focus:ring-2 focus:ring-primary py-4 px-6 text-lg" placeholder="4500" type="number" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-500">Aantal zonnepanelen</label>
                    <input className="w-full bg-background-light border-none rounded-lg focus:ring-2 focus:ring-primary py-4 px-6 text-lg" placeholder="12" type="number" />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-secondary font-bold flex items-center justify-center">2</span>
                  <h3 className="text-xl font-semibold">Batterijcapaciteit</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-medium text-slate-500">Gewenste capaciteit (kWh)</label>
                    <span className="text-3xl font-bold text-secondary">10.0 kWh</span>
                  </div>
                  <div className="relative py-4">
                    <div className="h-4 bg-background-light rounded-full w-full"></div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 h-4 bg-primary rounded-full w-[60%]"></div>
                    <div className="absolute top-1/2 left-[60%] -translate-y-1/2 w-10 h-10 bg-primary border-4 border-white rounded-full shadow-lg cursor-pointer"></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
                    <span>2.5 kWh</span>
                    <span>5 kWh</span>
                    <span>7.5 kWh</span>
                    <span>10 kWh</span>
                    <span>15 kWh</span>
                    <span>20 kWh</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-secondary font-bold flex items-center justify-center">3</span>
                  <h3 className="text-xl font-semibold">Extra Opties</h3>
                </div>
                <div className="flex items-center justify-between p-6 bg-background-light rounded-lg">
                  <div>
                    <p className="font-medium">Dynamisch energiecontract</p>
                    <p className="text-sm text-slate-500">Maximaliseer winst door laden op lage uren</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-14 h-8 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:w-[400px] bg-primary p-8 md:p-12 flex flex-col">
            <div className="mb-12">
              <p className="text-secondary font-medium mb-2 uppercase tracking-wider text-sm opacity-80">Jouw geschatte jaarlijkse besparing</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-poppins text-secondary">€ 1.450</span>
                <span className="text-secondary font-bold">/jr</span>
              </div>
            </div>

            <div className="flex-grow space-y-8">
              {/* Chart Mockup */}
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                <p className="text-xs font-bold text-secondary mb-4 uppercase">Direct Eigenverbruik</p>
                <div className="h-32 flex items-end gap-1">
                  <div className="w-full bg-secondary/10 rounded-t-full h-[40%]"></div>
                  <div className="w-full bg-secondary/10 rounded-t-full h-[60%]"></div>
                  <div className="w-full bg-secondary rounded-t-full h-[90%]"></div>
                  <div className="w-full bg-secondary rounded-t-full h-[100%]"></div>
                  <div className="w-full bg-secondary rounded-t-full h-[85%]"></div>
                  <div className="w-full bg-secondary/10 rounded-t-full h-[55%]"></div>
                  <div className="w-full bg-secondary/10 rounded-t-full h-[30%]"></div>
                </div>
                <div className="mt-4 flex justify-between text-[10px] text-secondary font-bold opacity-60">
                  <span>ZONDER BATTERIJ</span>
                  <span>MET BATTERIJ</span>
                </div>
              </div>

              <ul className="space-y-4 text-secondary">
                <li className="flex items-center gap-3">
                  <span className="material-icons text-xl">check_circle</span>
                  <span className="font-medium">Terugverdientijd: 6.2 jaar</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-xl">check_circle</span>
                  <span className="font-medium">CO2 reductie: 850kg/jr</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-icons text-xl">check_circle</span>
                  <span className="font-medium">Onafhankelijkheid: 78%</span>
                </li>
              </ul>
            </div>

            <Link href="/contact" className="mt-12 w-full bg-secondary text-white py-5 rounded-full font-bold text-lg shadow-xl hover:scale-[1.02] transition-transform text-center block">
              Vrijblijvend adviesgesprek
            </Link>
            <p className="text-center text-secondary/60 text-xs mt-4">Geen verplichtingen, 100% gratis</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-icons text-primary text-3xl">verified_user</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">A-Kwaliteit</h4>
            <p className="text-slate-500">Wij werken uitsluitend met de meest betrouwbare componenten en merken.</p>
          </div>
          <div className="p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-icons text-primary text-3xl">construction</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Eigen Installateurs</h4>
            <p className="text-slate-500">Vakkundige montage door onze eigen gecertificeerde Alterion experts.</p>
          </div>
          <div className="p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-icons text-primary text-3xl">eco</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Duurzame Impact</h4>
            <p className="text-slate-500">Versnel de energietransitie en verminder direct uw ecologische voetafdruk.</p>
          </div>
        </div>
      </section>

      {/* Visual Context Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="relative h-[400px] rounded-lg overflow-hidden group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Modern sustainable home"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSQDrJa4GzTWphB0UjDAyQjlKffTriHv_1R4Hu-zoeHMluMRRdv-hNTXJ4hMswHybCBytU81qIpOd2u-c8_bKPZquOmYpKJODkqmhWLXiz34MxqxqJrvsQJEHmzH0ETPyzJEVfSkf1w1NGYe9yHCx-fbThwpzh4PjceULjetPJt_43ACAoSb2T_AVvOVi3A4cLvdieqFG2YW-cgRCU1_7f_Bn5aoIqCA6lQ0bIdMbVA1tK2v2zJhvBxbNliMMib8lpp_2t0ZTuVga7"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 to-transparent flex items-center p-12">
            <div className="max-w-md">
              <h2 className="text-4xl font-poppins text-white mb-6">Een slimme investering in uw toekomst.</h2>
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
