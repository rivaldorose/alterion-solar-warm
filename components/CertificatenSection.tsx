"use client";

import { useState } from "react";
import { certificaten, certsForSegment, type Segment } from "@/lib/certificaten";

export default function CertificatenSection() {
  const [segment, setSegment] = useState<Segment>("beide");
  const visible = segment === "beide" ? certificaten : certsForSegment(segment);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Certificeringen</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-secondary tracking-tight">
            Erkend en gekwalificeerd
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Alterion werkt volgens de hoogste normen in de branche. Bekijk hieronder welke
            certificeringen van toepassing zijn op uw situatie.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          <button
            onClick={() => setSegment("beide")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              segment === "beide"
                ? "bg-secondary text-white"
                : "bg-white border border-slate-200 text-secondary hover:border-primary"
            }`}
          >
            Alle
          </button>
          <button
            onClick={() => setSegment("particulier")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              segment === "particulier"
                ? "bg-secondary text-white"
                : "bg-white border border-slate-200 text-secondary hover:border-primary"
            }`}
          >
            Particulier
          </button>
          <button
            onClick={() => setSegment("zakelijk")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              segment === "zakelijk"
                ? "bg-secondary text-white"
                : "bg-white border border-slate-200 text-secondary hover:border-primary"
            }`}
          >
            Zakelijk
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((cert) => (
            <div
              key={cert.naam}
              className="bg-neutral-gray border border-slate-100 rounded-xl p-6 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-secondary">{cert.naam}</h3>
                <span className="material-symbols-outlined text-primary">verified</span>
              </div>
              {cert.omschrijving && (
                <p className="text-sm text-slate-600 leading-relaxed">{cert.omschrijving}</p>
              )}
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-semibold hover:underline mt-auto"
                >
                  Meer info →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
