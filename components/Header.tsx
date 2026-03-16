"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Producten" },
  { href: "/webshop", label: "Webshop" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50">
      <nav className="bg-white/80 backdrop-blur-md px-8 py-4 rounded-full shadow-lg border border-primary/10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/Group 39891.png"
            alt="Alterion"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/winkelwagen" className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
            <span className="material-symbols-outlined text-secondary">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-secondary text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-slate-900 px-6 py-2.5 rounded-full font-semibold transition-all transform hover:scale-105 shadow-sm"
          >
            Offerte
          </Link>
        </div>

        {/* Mobile burger + cart */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/winkelwagen" className="relative p-1">
            <span className="material-symbols-outlined text-secondary">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-secondary text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu openen"
          >
            <span className={`block w-6 h-0.5 bg-slate-900 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-slate-900 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-slate-900 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-primary/10 px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 font-medium hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary/90 text-slate-900 px-6 py-2.5 rounded-full font-semibold text-center transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Offerte
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
