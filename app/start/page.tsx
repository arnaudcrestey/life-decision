import Link from "next/link";

export default function StartPage() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="glass-card w-full max-w-3xl p-8 text-center md:p-12">

        <h1 className="text-4xl font-bold md:text-5xl">
          Prêt à passer le diagnostic ?
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Répondez à 10 questions rapides pour identifier votre manière
          naturelle de prendre des décisions et les mécanismes qui
          influencent vos choix importants.
        </p>

        <p className="mt-4 text-sm text-slate-400">
          ✓ Test rapide • ✓ 2 minutes • ✓ Analyse décisionnelle
        </p>

        <Link
          href="/diagnostic"
          className="primary-btn mt-8"
        >
          Commencer le diagnostic
        </Link>

        <p className="mt-4 text-xs text-slate-500">
          Diagnostic gratuit • Sans inscription
        </p>

        <p className="mt-6 text-sm text-slate-400">
          🔎 Plus de 3 000 personnes ont déjà réalisé ce diagnostic
        </p>

      </div>
    </section>
  );
}
