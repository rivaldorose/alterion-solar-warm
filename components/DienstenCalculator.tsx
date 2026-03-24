'use client';

import { useState } from 'react';
import Link from 'next/link';

function formatDutchCurrency(amount: number): string {
  const rounded = Math.round(amount);
  return '€ ' + rounded.toLocaleString('nl-NL');
}

export default function DienstenCalculator() {
  const [yearlyUsage, setYearlyUsage] = useState(4500);
  const [solarPanels, setSolarPanels] = useState(12);
  const [batteryCapacity, setBatteryCapacity] = useState(10);
  const [dynamicContract, setDynamicContract] = useState(true);

  // Calculation
  const solarProduction = solarPanels * 400; // kWh/year
  const batteryFactor = Math.min(batteryCapacity / 10, 1.5); // scale by battery size
  const selfConsumption = solarProduction * 0.85 * batteryFactor;
  const electricityPrice = 0.40;
  const dynamicBonus = dynamicContract ? 1.15 : 1.0;
  const savings = selfConsumption * electricityPrice * dynamicBonus;
  const investmentCost = 4500 + (batteryCapacity - 5) * 300;
  const payback = savings > 0 ? investmentCost / savings : 0;
  const co2Reduction = Math.round(selfConsumption * 0.4); // kg CO2 per kWh
  const independence = Math.min(Math.round((selfConsumption / Math.max(yearlyUsage, 1)) * 100), 99);

  const sliderPercent = ((batteryCapacity - 2.5) / (20 - 2.5)) * 100;

  return (
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
                <input
                  className="w-full bg-background-light border-none rounded-lg focus:ring-2 focus:ring-primary py-4 px-6 text-lg"
                  placeholder="4500"
                  type="number"
                  value={yearlyUsage}
                  onChange={(e) => setYearlyUsage(Number(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-500">Aantal zonnepanelen</label>
                <input
                  className="w-full bg-background-light border-none rounded-lg focus:ring-2 focus:ring-primary py-4 px-6 text-lg"
                  placeholder="12"
                  type="number"
                  value={solarPanels}
                  onChange={(e) => setSolarPanels(Number(e.target.value) || 0)}
                />
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
                <span className="text-3xl font-bold text-secondary">{batteryCapacity.toFixed(1)} kWh</span>
              </div>
              <div className="relative py-4">
                <input
                  type="range"
                  min={2.5}
                  max={20}
                  step={0.5}
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="h-4 bg-background-light rounded-full w-full"></div>
                <div
                  className="absolute top-1/2 left-0 -translate-y-1/2 h-4 bg-primary rounded-full transition-all"
                  style={{ width: `${sliderPercent}%` }}
                ></div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-primary border-4 border-white rounded-full shadow-lg pointer-events-none transition-all"
                  style={{ left: `${sliderPercent}%`, transform: 'translate(-50%, -50%)' }}
                ></div>
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
                <input
                  checked={dynamicContract}
                  onChange={(e) => setDynamicContract(e.target.checked)}
                  className="sr-only peer"
                  type="checkbox"
                />
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
            <span className="text-5xl md:text-6xl font-poppins text-secondary">{formatDutchCurrency(savings)}</span>
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
              <span className="font-medium">Terugverdientijd: {payback > 0 ? payback.toFixed(1) : '—'} jaar</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-icons text-xl">check_circle</span>
              <span className="font-medium">CO2 reductie: {co2Reduction}kg/jr</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-icons text-xl">check_circle</span>
              <span className="font-medium">Onafhankelijkheid: {independence}%</span>
            </li>
          </ul>
        </div>

        <Link href="/contact" className="mt-12 w-full bg-secondary text-white py-5 rounded-full font-bold text-lg shadow-xl hover:scale-[1.02] transition-transform text-center block">
          Vrijblijvend adviesgesprek
        </Link>
        <p className="text-center text-secondary/60 text-xs mt-4">Geen verplichtingen, 100% gratis</p>
      </div>
    </div>
  );
}
