"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/over-ons", label: "Over Ons" },
  { href: "/webshop", label: "Webshop" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#264653] text-[#FEFAE0] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-[#E9C46A]" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Alterion
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold hover:text-[#E9C46A] transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-[#E76F51] hover:bg-[#F4A261] text-white text-sm font-bold px-5 py-2 rounded-full transition-colors"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Offerte aanvragen
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu openen"
        >
          <span className={`block w-6 h-0.5 bg-[#FEFAE0] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#FEFAE0] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-[#FEFAE0] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#264653] border-t border-[#2A9D8F] px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold hover:text-[#E9C46A] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-[#E76F51] hover:bg-[#F4A261] text-white text-sm font-bold px-5 py-2 rounded-full text-center transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Offerte aanvragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
