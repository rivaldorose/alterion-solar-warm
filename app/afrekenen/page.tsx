"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AfrekenPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"checkout" | "success" | "loading">("checkout");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(price);

  // Check if redirected back from Mollie with success
  const status = searchParams.get("status");
  if (status === "success" || step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-emerald-600 text-4xl">check_circle</span>
        </div>
        <h1 className="text-3xl font-black text-secondary mb-4">Betaling ontvangen!</h1>
        <p className="text-slate-600 mb-2">Bedankt voor uw bestelling. U ontvangt een bevestiging per e-mail.</p>
        <Link
          href="/"
          className="bg-primary text-secondary font-bold px-8 py-4 rounded-lg text-lg hover:brightness-105 transition-all inline-block"
        >
          Terug naar home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <span className="material-symbols-outlined text-slate-300 text-[80px] mb-6 block">shopping_cart</span>
        <h1 className="text-3xl font-black text-secondary mb-4">Geen producten om af te rekenen</h1>
        <Link
          href="/webshop"
          className="bg-primary text-secondary font-bold px-8 py-4 rounded-lg text-lg hover:brightness-105 transition-all inline-block"
        >
          Bekijk producten
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStep("loading");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customer: {
            naam: `${formData.get("voornaam")} ${formData.get("achternaam")}`,
            email: formData.get("email"),
            telefoon: formData.get("telefoon"),
          },
        }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        clearCart();
        window.location.href = data.checkoutUrl;
      } else {
        setError(data.error || "Er is iets misgegaan.");
        setStep("checkout");
      }
    } catch {
      setError("Kan geen verbinding maken met de betaalservice.");
      setStep("checkout");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-black text-secondary mb-10">Afrekenen</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contactgegevens */}
            <div className="bg-white rounded-xl border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Contactgegevens
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Voornaam *</label>
                  <input
                    required
                    name="voornaam"
                    className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Jan"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Achternaam *</label>
                  <input
                    required
                    name="achternaam"
                    className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="de Vries"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">E-mailadres *</label>
                  <input
                    required
                    name="email"
                    className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="jan@voorbeeld.nl"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Telefoon *</label>
                  <input
                    required
                    name="telefoon"
                    className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+31 6 12345678"
                    type="tel"
                  />
                </div>
              </div>
            </div>

            {/* Afleveradres */}
            <div className="bg-white rounded-xl border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">home</span>
                Afleveradres
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Straat + huisnummer *</label>
                  <input
                    required
                    className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Kerkstraat 12"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Postcode *</label>
                  <input
                    required
                    className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="1234 AB"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Plaats *</label>
                  <input
                    required
                    className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Amsterdam"
                    type="text"
                  />
                </div>
              </div>
            </div>

            {/* Betaalmethode */}
            <div className="bg-white rounded-xl border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">credit_card</span>
                Betaalmethode
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-4 p-4 rounded-lg border-2 border-primary bg-primary/5 cursor-pointer">
                  <input defaultChecked type="radio" name="payment" className="text-primary focus:ring-primary" />
                  <span className="font-bold text-secondary">iDEAL</span>
                  <span className="text-slate-400 text-sm ml-auto">Directe bankbetaling</span>
                </label>
                <label className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-primary cursor-pointer transition-colors">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                  <span className="font-bold text-secondary">Bancontact</span>
                  <span className="text-slate-400 text-sm ml-auto">Belgische betaling</span>
                </label>
                <label className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-primary cursor-pointer transition-colors">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                  <span className="font-bold text-secondary">Creditcard</span>
                  <span className="text-slate-400 text-sm ml-auto">Visa / Mastercard</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-xl border border-slate-100 p-8 h-fit sticky top-32">
            <h2 className="text-xl font-black text-secondary mb-6">Uw bestelling</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.slug} className="flex justify-between items-center gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-secondary text-sm truncate">{item.name}</p>
                    <p className="text-xs text-slate-400">Aantal: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-secondary text-sm shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotaal</span>
                <span className="font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Verzending</span>
                <span className="font-bold text-emerald-600">Gratis</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>BTW (21%)</span>
                <span className="font-bold">{formatPrice(totalPrice * 0.21)}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between">
                <span className="font-bold text-secondary text-lg">Totaal</span>
                <span className="font-black text-secondary text-2xl">{formatPrice(totalPrice * 1.21)}</span>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm font-medium mb-4">{error}</p>
            )}
            <button
              type="submit"
              disabled={step === "loading"}
              className="w-full bg-primary text-secondary font-bold py-4 rounded-lg text-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === "loading" ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Bezig met doorsturen...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">lock</span>
                  Afrekenen via Mollie
                </>
              )}
            </button>
            <p className="text-center text-slate-400 text-xs mt-4">
              U wordt doorgestuurd naar een beveiligde betaalpagina.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
