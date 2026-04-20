"use client";

import { useEffect, useState } from "react";

export default function BatteryInfoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        aria-label="Meer informatie over thuisbatterijen"
      >
        <span className="material-symbols-outlined text-base">info</span>
        Wat is een thuisbatterij?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="battery-info-title"
          >
            <div className="flex items-start justify-between p-6 border-b border-slate-100">
              <div>
                <p className="text-primary font-bold uppercase tracking-widest text-xs mb-1">Uitleg</p>
                <h3 id="battery-info-title" className="text-2xl font-semibold text-secondary">
                  Wat is een thuisbatterij?
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-secondary"
                aria-label="Sluiten"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-6 text-slate-700 leading-relaxed">
              <section>
                <h4 className="font-semibold text-secondary mb-2">De basis</h4>
                <p>
                  Een thuisbatterij slaat elektriciteit op die uw zonnepanelen overdag opwekken,
                  zodat u die &apos;s avonds en &apos;s nachts zelf kunt gebruiken. Zo bent u minder
                  afhankelijk van het stroomnet en bespaart u op uw energierekening — zeker nu
                  de salderingsregeling wordt afgebouwd.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-secondary mb-2">Waarom een batterij nu?</h4>
                <p>
                  Zonder batterij lever je je overschot terug voor vrijwel niets. Met een batterij
                  gebruik je je eigen opwek, en bij een dynamisch contract kun je zelfs verdienen door
                  te laden op daluren en te ontladen op piekuren.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-secondary mb-2">BMS vs EMS</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="font-bold text-secondary mb-1">BMS</p>
                    <p className="text-sm text-slate-500 mb-2">Battery Management System</p>
                    <p className="text-sm">
                      Bewaakt spanning, stroom en temperatuur van de batterijcellen voor een
                      veilige en lange levensduur.
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
                    <p className="font-bold text-secondary mb-1">EMS</p>
                    <p className="text-sm text-slate-500 mb-2">Energy Management System</p>
                    <p className="text-sm">
                      Stuurt slim wanneer geladen/ontladen wordt op basis van verbruik, opwek,
                      stroomprijzen en weersvoorspelling.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Ref:&nbsp;
                  <a
                    href="https://thuisbatterij.nl/blog/verschil-tussen-bms-en-ems/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    thuisbatterij.nl — BMS vs EMS
                  </a>
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-secondary mb-2">Particulier of zakelijk?</h4>
                <ul className="text-sm space-y-2 list-disc list-inside">
                  <li>
                    <span className="font-semibold text-secondary">Particulier:</span> compacte
                    1-fase of hybride systemen, plug &amp; play installatie, gericht op eigen
                    zelfgebruik.
                  </li>
                  <li>
                    <span className="font-semibold text-secondary">Zakelijk:</span> 3-fase systemen,
                    container-batterijen voor hogere capaciteit, peak shaving en netcongestie-ontzorging.
                  </li>
                </ul>
              </section>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="bg-primary text-secondary font-bold px-6 py-3 rounded-lg hover:brightness-105 transition-all"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
