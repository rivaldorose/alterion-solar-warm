import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#264653] text-[#FEFAE0] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Bedrijfsinfo */}
        <div>
          <h3 className="text-xl font-extrabold text-[#E9C46A] mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Alterion
          </h3>
          <address className="not-italic text-sm leading-7 text-[#FEFAE0]/80">
            Keurmeesterstraat 53<br />
            1187 ZX Amstelveen<br />
            KVK: 81350643<br />
            <a href="mailto:info@alterion.nl" className="hover:text-[#E9C46A] transition-colors">
              info@alterion.nl
            </a><br />
            <a href="https://www.alterion.nl" className="hover:text-[#E9C46A] transition-colors">
              www.alterion.nl
            </a>
          </address>
        </div>

        {/* Navigatie */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#2A9D8F] mb-4">Navigatie</h4>
          <nav className="flex flex-col gap-2 text-sm text-[#FEFAE0]/80">
            <Link href="/" className="hover:text-[#E9C46A] transition-colors">Home</Link>
            <Link href="/diensten" className="hover:text-[#E9C46A] transition-colors">Diensten</Link>
            <Link href="/over-ons" className="hover:text-[#E9C46A] transition-colors">Over Ons</Link>
            <Link href="/webshop" className="hover:text-[#E9C46A] transition-colors">Webshop</Link>
            <Link href="/contact" className="hover:text-[#E9C46A] transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#2A9D8F] mb-4">Legal</h4>
          <nav className="flex flex-col gap-2 text-sm text-[#FEFAE0]/80">
            <Link href="/voorwaarden" className="hover:text-[#E9C46A] transition-colors">Algemene Voorwaarden</Link>
            <Link href="/contact" className="hover:text-[#E9C46A] transition-colors">Offerte aanvragen</Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-[#2A9D8F]/30 px-6 py-4 text-center text-xs text-[#FEFAE0]/50">
        © {new Date().getFullYear()} Alterion. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
