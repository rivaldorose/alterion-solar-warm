import Link from "next/link";

export const metadata = {
  title: "Algemene Voorwaarden – Alterion",
  description: "Lees de algemene voorwaarden van Alterion.",
};

export default function VoorwaardenPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Juridisch</p>
      <h1 className="text-4xl font-semibold text-secondary mb-4 tracking-tight">Algemene Voorwaarden</h1>
      <p className="text-sm text-slate-400 mb-12">
        Laatst bijgewerkt: april 2026. Alterion BV, Keurmeesterstraat 53, 1187ZX Amstelveen.
      </p>

      <div className="prose prose-slate max-w-none space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-secondary">1. Definities</h2>
          <p className="text-slate-600 leading-relaxed">
            In deze algemene voorwaarden wordt verstaan onder: <strong>Alterion:</strong> Alterion, gevestigd aan Keurmeesterstraat 53, 1187ZX Amstelveen, ingeschreven bij de KvK onder nummer 81350643.
            <strong> Klant:</strong> de natuurlijke of rechtspersoon die met Alterion een overeenkomst aangaat.
            <strong> Producten:</strong> alle door Alterion aangeboden zonnepanelen, thuisbatterijen, omvormers, laadpalen en aanverwante apparatuur.
            <strong> Diensten:</strong> alle door Alterion aangeboden installatie-, advies- en onderhoudsdiensten.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">2. Toepasselijkheid</h2>
          <p className="text-slate-600 leading-relaxed">
            Deze voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten tussen Alterion en de Klant. Afwijkingen zijn alleen geldig indien schriftelijk overeengekomen. De toepasselijkheid van eventuele inkoop- of andere voorwaarden van de Klant wordt uitdrukkelijk van de hand gewezen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">3. Offertes en prijzen</h2>
          <p className="text-slate-600 leading-relaxed">
            Alle offertes zijn vrijblijvend en geldig gedurende 30 dagen, tenzij anders vermeld. Prijzen zijn inclusief BTW tenzij anders aangegeven. Alterion behoudt zich het recht voor om prijzen te wijzigen bij onvoorziene kostenstijgingen. Kennelijke fouten in prijsopgaven binden Alterion niet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">4. Levering en installatie</h2>
          <p className="text-slate-600 leading-relaxed">
            Leveringstermijnen zijn indicatief en geen fatale termijnen. Alterion streeft ernaar de installatie in te plannen binnen 40 werkdagen na goedkeuring van de offerte. Installatie geschiedt door gecertificeerde installateurs van Alterion. De Klant dient te zorgen voor adequate toegang tot de installatielocatie en een geschikte elektrische aansluiting.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">5. Garantie</h2>
          <p className="text-slate-600 leading-relaxed">
            Alterion biedt standaard 10 jaar garantie op thuisbatterijen, mits het product conform de instructies is geïnstalleerd en gebruikt. De garantie dekt materiaal- en fabricagefouten. Uitgesloten van garantie zijn: schade door verkeerd gebruik, externe oorzaken, of wijzigingen door derden. Bij een gegronde garantieclaim repareert of vervangt Alterion het product kosteloos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">6. Betaling</h2>
          <p className="text-slate-600 leading-relaxed">
            Betaling dient te geschieden binnen 14 dagen na factuurdatum, tenzij anders overeengekomen. Bij niet-tijdige betaling is de Klant van rechtswege in verzuim en is wettelijke rente verschuldigd. Alle buitengerechtelijke incassokosten komen voor rekening van de Klant.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">7. Herroepingsrecht</h2>
          <p className="text-slate-600 leading-relaxed">
            Bij aankoop op afstand heeft de Klant het recht de overeenkomst binnen 14 dagen na ontvangst van het product zonder opgave van redenen te ontbinden. Het product dient in originele staat en verpakking te worden geretourneerd. Reeds geïnstalleerde producten zijn uitgesloten van het herroepingsrecht.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">8. Aansprakelijkheid</h2>
          <p className="text-slate-600 leading-relaxed">
            De aansprakelijkheid van Alterion is beperkt tot het bedrag dat door de verzekering wordt uitgekeerd. Alterion is niet aansprakelijk voor indirecte schade, gevolgschade, gederfde winst of gemiste besparingen. De Klant vrijwaart Alterion voor aanspraken van derden.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">9. Toepasselijk recht</h2>
          <p className="text-slate-600 leading-relaxed">
            Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter te Amsterdam.
          </p>
        </section>

        <div className="bg-neutral-gray p-8 rounded-xl mt-12">
          <p className="text-slate-500 text-sm">
            Laatste update: maart 2026. Deze voorwaarden kunnen periodiek worden aangepast. De meest actuele versie is altijd beschikbaar op deze pagina.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Vragen? Neem <Link href="/contact" className="text-primary hover:underline font-medium">contact</Link> met ons op.
          </p>
        </div>
      </div>
    </div>
  );
}
