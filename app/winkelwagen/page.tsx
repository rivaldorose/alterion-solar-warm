"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function WinkelwagenPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(price);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <span className="material-symbols-outlined text-slate-300 text-[80px] mb-6 block">shopping_cart</span>
        <h1 className="text-3xl font-black text-secondary mb-4">Uw winkelwagen is leeg</h1>
        <p className="text-slate-500 mb-8">Voeg producten toe om verder te gaan.</p>
        <Link
          href="/webshop"
          className="bg-primary text-secondary font-bold px-8 py-4 rounded-lg text-lg hover:brightness-105 transition-all inline-block"
        >
          Bekijk producten
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-black text-secondary mb-10">Winkelwagen</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.slug}
              className="bg-white rounded-xl border border-slate-100 p-6 flex gap-6 items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain bg-slate-50 rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-secondary text-lg">{item.name}</h3>
                <p className="text-slate-500 text-sm">{formatPrice(item.price)} per stuk</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
                <span className="w-10 text-center font-bold text-secondary">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
              <p className="font-black text-secondary text-lg w-28 text-right">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button
                onClick={() => removeItem(item.slug)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl border border-slate-100 p-8 h-fit sticky top-32">
          <h2 className="text-xl font-black text-secondary mb-6">Overzicht</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-slate-600">
              <span>Subtotaal</span>
              <span className="font-bold text-secondary">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Verzending</span>
              <span className="font-bold text-emerald-600">Gratis</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>BTW (21%)</span>
              <span className="font-bold text-secondary">{formatPrice(totalPrice * 0.21)}</span>
            </div>
            <div className="border-t border-slate-100 pt-4 flex justify-between">
              <span className="font-bold text-secondary text-lg">Totaal</span>
              <span className="font-black text-secondary text-2xl">{formatPrice(totalPrice * 1.21)}</span>
            </div>
          </div>
          <Link
            href="/afrekenen"
            className="w-full bg-primary text-secondary font-bold py-4 rounded-lg text-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">lock</span>
            Afrekenen
          </Link>
          <Link
            href="/webshop"
            className="w-full text-center text-slate-500 text-sm font-medium mt-4 block hover:text-primary transition-colors"
          >
            Verder winkelen
          </Link>
        </div>
      </div>
    </div>
  );
}
