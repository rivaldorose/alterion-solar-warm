"use client";

import { useEffect, useState } from "react";

interface Step {
  step: string;
  icon: string;
  title: string;
  desc: string;
  details: string[];
}

const steps: Step[] = [
  {
    step: "1",
    icon: "chat",
    title: "Adviesgesprek",
    desc: "Gratis en vrijblijvend bespreken we uw situatie en wensen.",
    details: [
      "Onze specialist neemt contact op binnen 1 werkdag.",
      "We inventariseren uw energieverbruik en besparingsdoelen.",
      "U krijgt eerlijk advies — ook als een batterij niet de beste oplossing is.",
      "Gratis en zonder verplichtingen.",
    ],
  },
  {
    step: "2",
    icon: "calculate",
    title: "Offerte op maat",
    desc: "U ontvangt een persoonlijke offerte met exacte besparingen.",
    details: [
      "Op basis van uw jaarverbruik en woningtype.",
      "Inclusief verwachte jaarlijkse besparing en terugverdientijd.",
      "Alle kosten transparant: hardware, installatie, onderhoud.",
      "Offerte is 30 dagen geldig zonder verplichtingen.",
    ],
  },
  {
    step: "3",
    icon: "construction",
    title: "Installatie",
    desc: "Onze vakmensen installeren alles binnen één werkdag.",
    details: [
      "Gecertificeerde eigen installateurs — geen onderaannemers.",
      "Planning binnen 40 werkdagen na offerte-goedkeuring.",
      "Installatie duurt doorgaans één werkdag.",
      "Uitgebreide uitleg over bediening en monitoring na oplevering.",
    ],
  },
  {
    step: "4",
    icon: "monitoring",
    title: "Monitoring",
    desc: "Via de app heeft u realtime inzicht in uw besparing.",
    details: [
      "Realtime inzicht in opwek, verbruik en batterijstatus.",
      "Historische data om uw besparing bij te houden.",
      "Automatische optimalisatie bij dynamisch contract.",
      "Eerste jaar service-abonnement inbegrepen.",
    ],
  },
];

export default function WerkwijzeSection() {
  const [active, setActive] = useState<Step | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="py-24 bg-neutral-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-secondary tracking-tight">Onze werkwijze</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">In 4 stappen naar uw duurzame installatie</p>
          <p className="text-xs text-slate-400 mt-2">Klik op een stap voor meer informatie</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-y-8 md:gap-x-4 items-stretch">
          {steps.map((item, i) => (
            <div key={item.step} className="contents">
              <button
                type="button"
                onClick={() => setActive(item)}
                className="relative bg-white p-8 rounded-xl text-left hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Meer info over stap ${item.step}: ${item.title}`}
              >
                <span className="absolute -top-4 left-6 bg-primary text-secondary font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">
                  {item.step}
                </span>
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block mt-2">{item.icon}</span>
                <h3 className="text-base font-semibold text-secondary mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                <span className="text-xs text-primary font-semibold mt-3 inline-flex items-center gap-1">
                  Meer info <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center text-primary" aria-hidden="true">
                  <span className="material-symbols-outlined text-3xl">chevron_right</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="step-modal-title"
          >
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span className="bg-primary text-secondary font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg">
                  {active.step}
                </span>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Stap {active.step}</p>
                  <h3 id="step-modal-title" className="text-xl font-semibold text-secondary">
                    {active.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                className="text-slate-400 hover:text-secondary"
                aria-label="Sluiten"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6">
              <p className="text-slate-700 mb-4">{active.desc}</p>
              <ul className="space-y-3">
                {active.details.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActive(null)}
                className="bg-primary text-secondary font-bold px-6 py-3 rounded-lg hover:brightness-105 transition-all"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
