"use client";

import { useEffect, useState } from "react";
import FAQSection from "@/components/FAQSection";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    onderwerp: "Offerte aanvragen",
    bericht: "",
    website: "",
  });
  const [productContext, setProductContext] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Detecteer ?product=... uit URL (komt vanuit webshop "Offerte aanvragen" knop)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");
    if (product) {
      setProductContext(product);
      setFormData((prev) => ({
        ...prev,
        onderwerp: `Offerte aanvraag: ${product}`,
        bericht: prev.bericht || `Ik wil graag een offerte voor: ${product}\n\n`,
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...(productContext
            ? { source: "webshop-offerte", product: productContext }
            : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Er is iets misgegaan.");
      } else {
        setSuccess(data.message);
        setFormData({
          naam: "",
          email: "",
          telefoon: "",
          onderwerp: "Offerte aanvragen",
          bericht: "",
          website: "",
        });
      }
    } catch {
      setError("Er is iets misgegaan. Probeer het later opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Contact</p>
            <h1 className="text-4xl lg:text-6xl font-black text-secondary leading-[1.1] tracking-tight mb-6">
              Neem contact met ons op
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Heeft u vragen over onze thuisbatterijen of wilt u een vrijblijvende offerte aanvragen? Vul het formulier in of neem direct contact met ons op.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-neutral-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block">mail</span>
                <h3 className="text-lg font-bold text-secondary mb-2">E-mail</h3>
                <p className="text-slate-600">info@alterion.nl</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block">call</span>
                <h3 className="text-lg font-bold text-secondary mb-2">Telefoon</h3>
                <p className="text-slate-600">085 222 4003</p>
                <p className="text-sm text-slate-400 mt-1">Ma - Vr: 08:00 - 18:00</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block">location_on</span>
                <h3 className="text-lg font-bold text-secondary mb-2">Adres</h3>
                <p className="text-slate-600">Alterion BV</p>
                <p className="text-slate-600">Keurmeesterstraat 53</p>
                <p className="text-slate-600">1187ZX Amstelveen</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-secondary mb-8">
                {productContext ? "Vraag uw offerte aan" : "Stuur ons een bericht"}
              </h2>

              {productContext && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary">request_quote</span>
                  <div>
                    <p className="text-sm font-semibold text-secondary">Offerte-aanvraag voor:</p>
                    <p className="text-secondary font-bold">{productContext}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {success}
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                  <label>
                    Website (laat leeg)
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Naam *</label>
                    <input
                      name="naam"
                      value={formData.naam}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Uw volledige naam"
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">E-mailadres *</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="naam@voorbeeld.nl"
                      type="email"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Telefoonnummer</label>
                    <input
                      name="telefoon"
                      value={formData.telefoon}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+31 6 12345678"
                      type="tel"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">Onderwerp *</label>
                    <select
                      name="onderwerp"
                      value={formData.onderwerp}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    >
                      <option>Offerte aanvragen</option>
                      <option>Vraag over producten</option>
                      <option>Installatie informatie</option>
                      <option>Klantenservice</option>
                      <option>Anders</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider">Bericht *</label>
                  <textarea
                    name="bericht"
                    value={formData.bericht}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Vertel ons hoe we u kunnen helpen..."
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-secondary font-bold px-10 py-4 rounded-lg text-lg hover:brightness-105 transition-all shadow-lg shadow-primary/20 w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Verzenden..." : "Verstuur bericht"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-16 bg-neutral-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-xl overflow-hidden shadow-sm border border-slate-100">
            <iframe
              src="https://maps.google.com/maps?q=Keurmeesterstraat%2053%2C%201187ZX%20Amstelveen&t=m&z=16&output=embed&iwloc=near"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locatie Alterion BV, Keurmeesterstraat 53, Amstelveen"
            />
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
