"use client";

import { useState } from "react";

type Category = "alle" | "installatie" | "klantenservice" | "anders";

interface FAQ {
  q: string;
  a: string;
  category: Exclude<Category, "alle">;
}

const faqs: FAQ[] = [
  {
    q: "Hoe snel kan mijn thuisbatterij geïnstalleerd worden?",
    a: "Na goedkeuring van uw offerte plannen wij de installatie in binnen 40 werkdagen. De installatie zelf duurt doorgaans één werkdag.",
    category: "installatie",
  },
  {
    q: "Welke garantie bieden jullie?",
    a: "Wij bieden standaard 10 jaar volledige garantie op al onze thuisbatterijen, inclusief onderdelen en arbeidsloon.",
    category: "klantenservice",
  },
  {
    q: "Is een offerte aanvragen gratis en vrijblijvend?",
    a: "Ja, het aanvragen van een offerte is volledig gratis en vrijblijvend. Wij komen graag met u in gesprek over de mogelijkheden.",
    category: "anders",
  },
  {
    q: "Kan ik de thuisbatterij combineren met mijn bestaande zonnepanelen?",
    a: "Ja, onze thuisbatterijen zijn compatibel met alle gangbare omvormers en zonnepaneel-systemen.",
    category: "anders",
  },
];

const CATEGORY_LABELS: Record<Category, string> = {
  alle: "Alle",
  installatie: "Installatie",
  klantenservice: "Klantenservice",
  anders: "Anders",
};

export default function FAQSection() {
  const [active, setActive] = useState<Category>("alle");

  const visible = active === "alle" ? faqs : faqs.filter((f) => f.category === active);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-secondary mb-4 text-center tracking-tight">
          Veelgestelde vragen
        </h2>
        <p className="text-slate-600 text-center mb-10">
          Filter op categorie om snel het juiste antwoord te vinden.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                active === c
                  ? "bg-secondary text-white"
                  : "bg-white border border-slate-200 text-secondary hover:border-primary"
              }`}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Geen vragen in deze categorie.</p>
        ) : (
          <div className="space-y-4">
            {visible.map((faq, i) => (
              <details key={i} className="group bg-neutral-gray rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-secondary hover:text-primary transition-colors list-none">
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {CATEGORY_LABELS[faq.category]}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform shrink-0">
                    expand_more
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
