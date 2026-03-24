import Link from "next/link";

export const metadata = {
  title: "Privacybeleid – Alterion",
  description: "Lees het privacybeleid van Alterion.",
};

export default function PrivacybeleidPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Juridisch</p>
      <h1 className="text-4xl font-black text-secondary mb-12">Privacybeleid</h1>

      <div className="prose prose-slate max-w-none space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-secondary">1. Inleiding</h2>
          <p className="text-slate-600 leading-relaxed">
            Alterion (gevestigd aan Keurmeesterstraat 53, 1187ZX Amstelveen, KvK 81350643) respecteert uw privacy en draagt er zorg voor dat uw persoonlijke gegevens vertrouwelijk worden behandeld. Dit privacybeleid beschrijft welke gegevens wij verzamelen, hoe wij deze gebruiken en welke rechten u heeft.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">2. Welke gegevens verzamelen wij?</h2>
          <p className="text-slate-600 leading-relaxed">Wij verzamelen de volgende categorieën persoonsgegevens:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-3">
            <li><strong>Contactgegevens:</strong> naam, e-mailadres, telefoonnummer, adres</li>
            <li><strong>Bestelgegevens:</strong> bestelde producten, factuuradressen, betaalgegevens</li>
            <li><strong>Technische gegevens:</strong> IP-adres, browsertype, apparaatinformatie</li>
            <li><strong>Gebruiksgegevens:</strong> energieverbruiksdata via de Alterion App (met uw toestemming)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">3. Doeleinden van verwerking</h2>
          <p className="text-slate-600 leading-relaxed">Wij gebruiken uw gegevens voor:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-3">
            <li>Het verwerken en leveren van uw bestellingen</li>
            <li>Het inplannen en uitvoeren van installaties</li>
            <li>Het verlenen van klantenservice en garantieafhandeling</li>
            <li>Het optimaliseren van uw energiebeheer via de Alterion App</li>
            <li>Het versturen van nieuwsbrieven en aanbiedingen (met uw toestemming)</li>
            <li>Het verbeteren van onze website en dienstverlening</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">4. Bewaartermijn</h2>
          <p className="text-slate-600 leading-relaxed">
            Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor ze zijn verzameld. Financiële gegevens worden conform de wettelijke verplichting 7 jaar bewaard. Overige gegevens worden na beëindiging van de klantrelatie binnen 2 jaar verwijderd.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">5. Delen met derden</h2>
          <p className="text-slate-600 leading-relaxed">
            Wij delen uw gegevens alleen met derden wanneer dit noodzakelijk is voor de uitvoering van de overeenkomst of wanneer wij hiertoe wettelijk verplicht zijn. De partijen waarmee wij samenwerken zijn onder andere:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-3">
            <li><strong>Vimexx:</strong> onze hostingprovider voor de website</li>
            <li><strong>Mollie:</strong> voor het veilig verwerken van betalingen</li>
            <li><strong>Google Analytics:</strong> voor het analyseren van websitegebruik (geanonimiseerd)</li>
            <li><strong>Mailchimp:</strong> voor het versturen van nieuwsbrieven (alleen met uw toestemming)</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-3">
            Wij sluiten met alle verwerkers een verwerkersovereenkomst om de beveiliging van uw gegevens te waarborgen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">6. Uw rechten</h2>
          <p className="text-slate-600 leading-relaxed">Op grond van de AVG heeft u de volgende rechten:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-3">
            <li><strong>Recht op inzage:</strong> U kunt opvragen welke gegevens wij van u hebben</li>
            <li><strong>Recht op rectificatie:</strong> U kunt onjuiste gegevens laten corrigeren</li>
            <li><strong>Recht op verwijdering:</strong> U kunt verzoeken uw gegevens te verwijderen</li>
            <li><strong>Recht op beperking:</strong> U kunt de verwerking van uw gegevens beperken</li>
            <li><strong>Recht op overdraagbaarheid:</strong> U kunt uw gegevens opvragen in een gangbaar formaat</li>
            <li><strong>Recht van bezwaar:</strong> U kunt bezwaar maken tegen verwerking voor direct marketing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">7. Beveiliging</h2>
          <p className="text-slate-600 leading-relaxed">
            Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Onze systemen worden regelmatig gecontroleerd en bijgewerkt.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">8. Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            Voor vragen over dit privacybeleid of het uitoefenen van uw rechten kunt u contact opnemen via <strong>privacy@alterion.nl</strong> of via ons <Link href="/contact" className="text-primary hover:underline font-medium">contactformulier</Link>.
          </p>
        </section>

        <div className="bg-neutral-gray p-8 rounded-xl mt-12">
          <p className="text-slate-500 text-sm">
            Laatste update: maart 2026. Alterion | KvK: 81350643 | Keurmeesterstraat 53, 1187ZX Amstelveen
          </p>
        </div>
      </div>
    </div>
  );
}
