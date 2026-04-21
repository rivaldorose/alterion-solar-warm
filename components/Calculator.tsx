'use client';

import { useState } from 'react';
import Link from 'next/link';

function formatDutchCurrency(amount: number): string {
  const rounded = Math.round(amount);
  return '€ ' + rounded.toLocaleString('nl-NL') + ',-';
}

export default function Calculator() {
  const [energyBill, setEnergyBill] = useState(0);
  const [solarPanels, setSolarPanels] = useState(0);
  const [batteryCapacity, setBatteryCapacity] = useState(0);
  const [houseType, setHouseType] = useState(1.0);

  // Panels: 400 kWh/jaar per paneel. Zelfgebruik 35% zonder batterij, tot 85% met 10 kWh+.
  const solarProduction = solarPanels * 400;
  const batteryBoost = batteryCapacity > 0 ? Math.min(0.85, 0.35 + batteryCapacity * 0.05) : 0.35;
  const selfUseFraction = solarPanels > 0 ? batteryBoost : 0;
  const selfConsumption = solarProduction * selfUseFraction;
  const solarSavings = selfConsumption * 0.40 * houseType;

  // Arbitrage: alleen batterij, dynamisch contract aangenomen (300 cycli * spread 0.15 €/kWh)
  const arbitrageSavings = batteryCapacity > 0 ? batteryCapacity * 300 * 0.15 : 0;

  const savings = solarSavings + arbitrageSavings;
  const investment = batteryCapacity * 700 + solarPanels * 300;
  const payback = savings > 0 && investment > 0 ? investment / savings : 0;

  const houseTypeOptions: { label: string; value: number }[] = [
    { label: 'Vrijstaand', value: 1.0 },
    { label: 'Tussenwoning', value: 0.85 },
    { label: 'Hoekwoning', value: 0.9 },
    { label: 'Appartement', value: 0.7 },
  ];

  return (
    <section id="calculator" className="bg-neutral-gray border-t-4 border-primary py-24 scroll-mt-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-secondary tracking-tight">Bereken uw besparing in 1 minuut</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary uppercase tracking-wider">Energierekening /mnd</label>
            <input
              className="w-full p-4 rounded-lg border-none bg-white shadow-sm focus:ring-2 focus:ring-primary"
              placeholder="€ 0"
              type="number"
              min={0}
              value={energyBill || ''}
              onChange={(e) => setEnergyBill(Number(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary uppercase tracking-wider">
              Zonnepanelen: <span className="text-primary">{solarPanels}</span>
            </label>
            <div className="pt-5">
              <input
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                type="range"
                min={0}
                max={30}
                value={solarPanels}
                onChange={(e) => setSolarPanels(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary uppercase tracking-wider">
              Batterij: <span className="text-primary">{batteryCapacity} kWh</span>
            </label>
            <div className="pt-5">
              <input
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                type="range"
                min={0}
                max={30}
                step={0.5}
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-secondary uppercase tracking-wider">Type woning</label>
            <select
              className="w-full p-4 rounded-lg border-none bg-white shadow-sm focus:ring-2 focus:ring-primary"
              value={houseType}
              onChange={(e) => setHouseType(Number(e.target.value))}
            >
              {houseTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-500 font-medium mb-2">Uw geschatte besparing per jaar</p>
              <h3 className="text-5xl font-semibold text-secondary mb-6">{formatDutchCurrency(savings)}</h3>
              <div className="flex items-center gap-2 text-secondary font-bold">
                <span className="material-symbols-outlined text-green-500">schedule</span>
                Terugverdientijd: {payback > 0 ? payback.toFixed(1) : '—'} jaar
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="bg-primary text-secondary font-bold px-8 py-5 rounded-lg text-lg hover:brightness-105 transition-all shadow-lg shadow-primary/20 text-center"
              >
                Direct advies aanvragen
              </Link>
              <p className="text-xs text-center text-slate-400">Deze berekening is een indicatie op basis van gemiddelden.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
