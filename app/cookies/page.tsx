import Link from "next/link";

export const metadata = {
  title: "Cookiebeleid – Alterion",
  description: "Lees het cookiebeleid van Alterion.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Juridisch</p>
      <h1 className="text-4xl font-black text-secondary mb-12">Cookiebeleid</h1>

      <div className="prose prose-slate max-w-none space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-secondary">1. Wat zijn cookies?</h2>
          <p className="text-slate-600 leading-relaxed">
            Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u onze website bezoekt. Ze helpen ons om de website goed te laten functioneren, uw voorkeuren te onthouden en het gebruik van onze website te analyseren.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">2. Welke cookies gebruiken wij?</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="p-4 text-left text-sm font-bold rounded-tl-lg">Cookie</th>
                  <th className="p-4 text-left text-sm font-bold">Type</th>
                  <th className="p-4 text-left text-sm font-bold">Doel</th>
                  <th className="p-4 text-left text-sm font-bold rounded-tr-lg">Bewaartermijn</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-4 text-sm text-slate-600 font-medium">Sessiecookie</td>
                  <td className="p-4 text-sm text-slate-600">Noodzakelijk</td>
                  <td className="p-4 text-sm text-slate-600">Winkelwagen en inlogstatus</td>
                  <td className="p-4 text-sm text-slate-600">Sessie</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="p-4 text-sm text-slate-600 font-medium">Voorkeurscookie</td>
                  <td className="p-4 text-sm text-slate-600">Functioneel</td>
                  <td className="p-4 text-sm text-slate-600">Taalinstellingen onthouden</td>
                  <td className="p-4 text-sm text-slate-600">1 jaar</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-4 text-sm text-slate-600 font-medium">Google Analytics</td>
                  <td className="p-4 text-sm text-slate-600">Analytisch</td>
                  <td className="p-4 text-sm text-slate-600">Websitegebruik analyseren</td>
                  <td className="p-4 text-sm text-slate-600">2 jaar</td>
                </tr>
                <tr>
                  <td className="p-4 text-sm text-slate-600 font-medium">Cookietoestemming</td>
                  <td className="p-4 text-sm text-slate-600">Noodzakelijk</td>
                  <td className="p-4 text-sm text-slate-600">Uw cookievoorkeuren opslaan</td>
                  <td className="p-4 text-sm text-slate-600">1 jaar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">3. Noodzakelijke cookies</h2>
          <p className="text-slate-600 leading-relaxed">
            Deze cookies zijn essentieel voor het functioneren van de website. Zonder deze cookies kunnen basisfuncties zoals het navigeren door pagina&apos;s en het gebruik van de winkelwagen niet werken. Deze cookies vereisen geen toestemming.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">4. Analytische cookies</h2>
          <p className="text-slate-600 leading-relaxed">
            Wij gebruiken Google Analytics om inzicht te krijgen in hoe bezoekers onze website gebruiken. Deze informatie helpt ons de website te verbeteren. De gegevens worden geanonimiseerd verzameld. IP-adressen worden gemaskeerd. Wij hebben een verwerkersovereenkomst met Google afgesloten.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">5. Cookies beheren</h2>
          <p className="text-slate-600 leading-relaxed">
            U kunt uw cookievoorkeuren op elk moment wijzigen via uw browserinstellingen. Houd er rekening mee dat het uitschakelen van cookies de functionaliteit van onze website kan beperken. Hieronder vindt u instructies voor de meestgebruikte browsers:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-3">
            <li>Google Chrome: Instellingen &gt; Privacy en beveiliging &gt; Cookies</li>
            <li>Mozilla Firefox: Instellingen &gt; Privacy &amp; Beveiliging &gt; Cookies</li>
            <li>Safari: Voorkeuren &gt; Privacy &gt; Cookies en websitegegevens</li>
            <li>Microsoft Edge: Instellingen &gt; Cookies en sitemachtigingen</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary">6. Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            Voor vragen over ons cookiebeleid kunt u contact opnemen via <strong>privacy@alterion.nl</strong> of via ons <Link href="/contact" className="text-primary hover:underline font-medium">contactformulier</Link>.
          </p>
        </section>

        <div className="bg-neutral-gray p-8 rounded-xl mt-12">
          <p className="text-slate-500 text-sm">
            Laatste update: maart 2026. Zie ook ons <Link href="/privacybeleid" className="text-primary hover:underline">privacybeleid</Link> en onze <Link href="/voorwaarden" className="text-primary hover:underline">algemene voorwaarden</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
