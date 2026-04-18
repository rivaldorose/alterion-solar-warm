export const metadata = {
  title: "Disclaimer – Alterion",
  description: "Lees de disclaimer van Alterion.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Juridisch</p>
      <h1 className="text-4xl font-black text-secondary mb-12">Disclaimer</h1>

      <div className="prose prose-slate max-w-none space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-secondary">1. Website Disclaimer van alterion.nl</h2>
          <p className="text-slate-600 leading-relaxed">
            Alle informatie op deze website wordt aangeboden voor informatieve doeleinden. Wij doen ons best om de informatie op alterion.nl zo volledig en nauwkeurig mogelijk te houden, maar geven geen garantie dat alle informatie te allen tijde volledig, juist of actueel is. Aan de informatie op deze website kunnen geen rechten worden ontleend.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">2. Aansprakelijkheid</h2>
          <p className="text-slate-600 leading-relaxed">
            Alterion is niet aansprakelijk voor enig verlies of schade van welke aard dan ook, die voortvloeit uit het gebruik van of het vertrouwen op de informatie die op deze website wordt verstrekt. Het gebruik van informatie op deze website is volledig voor eigen risico.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">3. Links naar andere websites</h2>
          <p className="text-slate-600 leading-relaxed">
            Deze website kan links bevatten naar websites van derden. Alterion heeft geen controle over de inhoud van deze externe websites en is niet verantwoordelijk voor de inhoud, het privacybeleid of de praktijken van websites van derden. Het volgen van links naar externe websites is op eigen risico.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">4. Beschikbaarheid</h2>
          <p className="text-slate-600 leading-relaxed">
            Alterion is niet verantwoordelijk voor de tijdelijke onbeschikbaarheid van de website door technische storingen, onderhoud of andere oorzaken. Wij streven ernaar de website zo veel mogelijk beschikbaar te houden, maar kunnen geen ononderbroken toegang garanderen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">5. Garanties</h2>
          <p className="text-slate-600 leading-relaxed">
            Deze website en de inhoud ervan worden geleverd op een &quot;AS IS&quot; basis door Bizzz Media, zonder enige garanties, expliciet of impliciet. Dit omvat, maar is niet beperkt tot, impliciete garanties van verkoopbaarheid, geschiktheid voor een bepaald doel of niet-inbreuk op intellectuele eigendomsrechten.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">6. Schade</h2>
          <p className="text-slate-600 leading-relaxed">
            Alterion en haar directeuren, medewerkers, partners en leveranciers zijn in geen geval aansprakelijk voor directe, indirecte, incidentele, bijzondere of gevolgschade die voortvloeit uit het gebruik van, of het onvermogen tot gebruik van, deze website of de inhoud ervan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">7. Bijwerken van deze disclaimer</h2>
          <p className="text-slate-600 leading-relaxed">
            Alterion behoudt zich het recht voor om deze disclaimer op elk moment te wijzigen. Wijzigingen worden op deze pagina prominent vermeld. Wij raden u aan deze pagina regelmatig te raadplegen om op de hoogte te blijven van eventuele wijzigingen.
          </p>
        </section>

        <div className="bg-neutral-gray p-8 rounded-xl mt-12">
          <p className="text-slate-500 text-sm">
            Laatste update: maart 2026. Alterion | Keurmeesterstraat 53, 1187ZX Amstelveen | KVK: 81350643 | BTW: NL862053742B01
          </p>
        </div>
      </div>
    </div>
  );
}
