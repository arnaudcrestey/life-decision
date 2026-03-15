import Link from "next/link";

export default function StartPage() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="glass-card w-full max-w-2xl p-10 text-center md:p-12">

        <h1 className="text-4xl font-bold md:text-5xl">
          Prêt à commencer ?
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-slate-300">
          Répondez simplement aux 10 questions suivantes.
          Il n existe pas de bonnes ou de mauvaises réponses.
          Choisissez la réponse qui vous correspond le plus spontanément.
        </p>

        <div className="mt-6 text-sm text-slate-400">
          10 questions • 2 minutes
        </div>

        <Link href="/diagnostic" className="primary-btn mt-10">
          Commencer
        </Link>

      </div>
    </section>
  );
}
