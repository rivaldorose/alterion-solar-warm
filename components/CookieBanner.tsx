'use client';

import { useState, useSyncExternalStore } from 'react';

function subscribeCookie() {
  return () => {};
}

function getCookieSnapshot() {
  return getCookie('alterion_cookie_consent');
}

function getCookieServerSnapshot() {
  return null;
}

interface CookiePrefs {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeCookie,
    getCookieSnapshot,
    getCookieServerSnapshot
  );
  const [dismissed, setDismissed] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>({
    necessary: true,
    preferences: true,
    statistics: true,
    marketing: false,
  });

  const visible = !consent && !dismissed;
  const setVisible = (v: boolean) => setDismissed(!v);

  const acceptAll = () => {
    setCookie('alterion_cookie_consent', 'all', 365);
    setCookie(
      'alterion_cookie_prefs',
      JSON.stringify({ necessary: true, preferences: true, statistics: true, marketing: true }),
      365
    );
    setVisible(false);
  };

  const rejectAll = () => {
    setCookie('alterion_cookie_consent', 'necessary', 365);
    setCookie(
      'alterion_cookie_prefs',
      JSON.stringify({ necessary: true, preferences: false, statistics: false, marketing: false }),
      365
    );
    setVisible(false);
  };

  const savePreferences = () => {
    const allOn = prefs.preferences && prefs.statistics && prefs.marketing;
    const consentType = allOn ? 'all' : 'custom';
    setCookie('alterion_cookie_consent', consentType, 365);
    setCookie('alterion_cookie_prefs', JSON.stringify(prefs), 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999]">
      <div className="bg-secondary text-white mx-4 mb-4 rounded-xl shadow-2xl border border-white/10 max-w-3xl lg:mx-auto">
        {/* Main Banner */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-3xl mt-0.5 shrink-0">cookie</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">Beheer toestemming</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Wij gebruiken cookies om uw ervaring te verbeteren, verkeer te analyseren en gepersonaliseerde content aan te bieden. U kunt uw voorkeuren hieronder beheren.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button
              onClick={acceptAll}
              className="bg-primary text-secondary font-bold px-6 py-3 rounded-lg text-sm hover:brightness-105 transition-all"
            >
              Accepteren
            </button>
            <button
              onClick={rejectAll}
              className="border border-white/30 text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-white/10 transition-all"
            >
              Weigeren
            </button>
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="text-white/70 font-medium px-6 py-3 rounded-lg text-sm hover:text-white transition-all"
            >
              {showPreferences ? 'Sluit voorkeuren' : 'Bekijk voorkeuren'}
            </button>
          </div>
        </div>

        {/* Preferences Panel */}
        {showPreferences && (
          <div className="border-t border-white/10 p-6 space-y-4">
            {/* Noodzakelijk */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Noodzakelijk</p>
                <p className="text-xs text-slate-400">Essentieel voor de werking van de website.</p>
              </div>
              <div className="w-12 h-7 bg-primary rounded-full relative cursor-not-allowed opacity-70">
                <div className="absolute top-[3px] right-[3px] w-[22px] h-[22px] bg-white rounded-full"></div>
              </div>
            </div>

            {/* Voorkeuren */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Voorkeuren</p>
                <p className="text-xs text-slate-400">Onthoud uw instellingen en taalvoorkeur.</p>
              </div>
              <button
                onClick={() => setPrefs((p) => ({ ...p, preferences: !p.preferences }))}
                className={`w-12 h-7 rounded-full relative transition-colors ${prefs.preferences ? 'bg-primary' : 'bg-slate-600'}`}
              >
                <div
                  className={`absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full transition-all ${prefs.preferences ? 'right-[3px]' : 'left-[3px]'}`}
                ></div>
              </button>
            </div>

            {/* Statistieken */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Statistieken</p>
                <p className="text-xs text-slate-400">Anonieme gegevens om de website te verbeteren.</p>
              </div>
              <button
                onClick={() => setPrefs((p) => ({ ...p, statistics: !p.statistics }))}
                className={`w-12 h-7 rounded-full relative transition-colors ${prefs.statistics ? 'bg-primary' : 'bg-slate-600'}`}
              >
                <div
                  className={`absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full transition-all ${prefs.statistics ? 'right-[3px]' : 'left-[3px]'}`}
                ></div>
              </button>
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Marketing</p>
                <p className="text-xs text-slate-400">Gepersonaliseerde advertenties en content.</p>
              </div>
              <button
                onClick={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
                className={`w-12 h-7 rounded-full relative transition-colors ${prefs.marketing ? 'bg-primary' : 'bg-slate-600'}`}
              >
                <div
                  className={`absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full transition-all ${prefs.marketing ? 'right-[3px]' : 'left-[3px]'}`}
                ></div>
              </button>
            </div>

            <button
              onClick={savePreferences}
              className="w-full bg-primary text-secondary font-bold px-6 py-3 rounded-lg text-sm hover:brightness-105 transition-all mt-2"
            >
              Voorkeuren opslaan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
