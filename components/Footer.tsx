import Link from "next/link";
import Image from "next/image";
import { certificaten } from "@/lib/certificaten";

export default function Footer() {
  return (
    <footer className="bg-secondary pt-20 pb-10 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <Image
              src="/logos/Group 39891-1.png"
              alt="Alterion"
              width={140}
              height={35}
              className="h-8 w-auto"
            />
            <p className="text-slate-400 text-sm leading-relaxed">
              Wij versnellen de energietransitie door slimme energie-opslag toegankelijk te maken voor iedereen.
            </p>
          </div>

          {/* Producten */}
          <div>
            <h4 className="text-white font-bold mb-6">Producten</h4>
            <ul className="space-y-2">
              <li><Link className="text-slate-400 text-sm hover:text-primary transition-colors" href="/webshop/marstek-venus-a">Marstek Venus A</Link></li>
              <li><Link className="text-slate-400 text-sm hover:text-primary transition-colors" href="/webshop/marstek-venus-ev3">Marstek Venus EV3</Link></li>
              <li><Link className="text-slate-400 text-sm hover:text-primary transition-colors" href="/webshop/marstek-venus-ev35">Marstek Venus EV3.5</Link></li>
              <li><Link className="text-slate-400 text-sm hover:text-primary transition-colors" href="/webshop">Alle producten</Link></li>
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h4 className="text-white font-bold mb-6">Bedrijf</h4>
            <ul className="space-y-2">
              <li><Link className="text-slate-400 text-sm hover:text-primary transition-colors" href="/over-ons">Over Alterion</Link></li>
              <li><Link className="text-slate-400 text-sm hover:text-primary transition-colors" href="/webshop">Webshop</Link></li>
              <li><Link className="text-slate-400 text-sm hover:text-primary transition-colors" href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="material-symbols-outlined text-primary text-sm">mail</span>
                info@alterion.nl
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="material-symbols-outlined text-primary text-sm">call</span>
                085 222 4003
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                Keurmeesterstraat 53, 1187ZX Amstelveen
              </li>
            </ul>
          </div>
        </div>

        {/* Certificaten */}
        <div className="pb-12 mb-12 border-b border-slate-800">
          <h4 className="text-white font-bold mb-6 text-center">Certificaten</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {certificaten.map((cert) => (
              <div key={cert.naam} className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-lg border border-white/10">
                <span className="text-white text-sm font-semibold">{cert.naam}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">&copy; {new Date().getFullYear()} Alterion Energy Solutions. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <Link className="text-slate-500 hover:text-primary transition-colors text-xs" href="/privacybeleid">Privacybeleid</Link>
            <Link className="text-slate-500 hover:text-primary transition-colors text-xs" href="/voorwaarden">Algemene Voorwaarden</Link>
            <Link className="text-slate-500 hover:text-primary transition-colors text-xs" href="/cookies">Cookiebeleid</Link>
            <Link className="text-slate-500 hover:text-primary transition-colors text-xs" href="/disclaimer">Disclaimer</Link>
          </div>
        </div>

        {/* Gemaakt door */}
        <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-center items-center gap-2">
          <span className="text-white text-sm">Gemaakt door</span>
          <Image
            src="/makers logo/Group 2.png"
            alt="RoseVibes Studio"
            width={160}
            height={48}
            className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity brightness-0 invert"
          />
        </div>
      </div>
    </footer>
  );
}
