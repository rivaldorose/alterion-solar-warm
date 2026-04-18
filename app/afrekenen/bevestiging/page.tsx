import Link from "next/link";
import { createMollieClient } from "@mollie/api-client";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ id?: string }>;
};

async function getPaymentStatus(id: string) {
  if (!id.startsWith("tr_")) return null;

  try {
    const mollieClient = createMollieClient({
      apiKey: process.env.MOLLIE_API_KEY!,
    });
    const payment = await mollieClient.payments.get(id);
    return {
      status: payment.status,
      amount: payment.amount,
      description: payment.description,
    };
  } catch (err) {
    console.error("Mollie payment lookup error:", err);
    return null;
  }
}

export default async function BevestigingPage({ searchParams }: Props) {
  const { id } = await searchParams;
  const payment = id ? await getPaymentStatus(id) : null;

  if (!payment) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-amber-600 text-4xl">help</span>
        </div>
        <h1 className="text-3xl font-black text-secondary mb-4">Betaling niet gevonden</h1>
        <p className="text-slate-600 mb-8">
          We konden uw betaling niet terugvinden. Neem contact op als u al betaald heeft.
        </p>
        <Link
          href="/"
          className="bg-primary text-secondary font-bold px-8 py-4 rounded-lg text-lg hover:brightness-105 transition-all inline-block"
        >
          Terug naar home
        </Link>
      </div>
    );
  }

  if (payment.status === "paid") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-emerald-600 text-4xl">check_circle</span>
        </div>
        <h1 className="text-3xl font-black text-secondary mb-4">Betaling ontvangen!</h1>
        <p className="text-slate-600 mb-2">
          Bedankt voor uw bestelling. U ontvangt een bevestiging per e-mail.
        </p>
        <p className="text-slate-400 text-sm mb-8">Bedrag: €{payment.amount.value}</p>
        <Link
          href="/"
          className="bg-primary text-secondary font-bold px-8 py-4 rounded-lg text-lg hover:brightness-105 transition-all inline-block"
        >
          Terug naar home
        </Link>
      </div>
    );
  }

  if (["failed", "canceled", "expired"].includes(payment.status)) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-red-600 text-4xl">cancel</span>
        </div>
        <h1 className="text-3xl font-black text-secondary mb-4">Betaling niet geslaagd</h1>
        <p className="text-slate-600 mb-8">
          Uw betaling is niet voltooid. Probeer het opnieuw of neem contact op.
        </p>
        <Link
          href="/webshop"
          className="bg-primary text-secondary font-bold px-8 py-4 rounded-lg text-lg hover:brightness-105 transition-all inline-block"
        >
          Terug naar webshop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <span className="material-symbols-outlined text-slate-600 text-4xl animate-spin">progress_activity</span>
      </div>
      <h1 className="text-3xl font-black text-secondary mb-4">Betaling in behandeling</h1>
      <p className="text-slate-600 mb-8">
        Uw betaling wordt verwerkt. U ontvangt een bevestiging zodra deze voltooid is.
      </p>
      <Link
        href="/"
        className="bg-primary text-secondary font-bold px-8 py-4 rounded-lg text-lg hover:brightness-105 transition-all inline-block"
      >
        Terug naar home
      </Link>
    </div>
  );
}
