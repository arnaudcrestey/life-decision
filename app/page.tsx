import Link from 'next/link';

const highlights = [
  'Choix de carrière',
  'Décisions importantes',
  'Transitions de vie',
  'Blocages décisionnels',
  'Direction de vie',
  'Clarté intérieure'
];

export default function HomePage() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="glass-card w-full p-8 text-center md:p-12">

        <p className="mb-4 inline-flex rounded-full border border-cyan-300/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
          Diagnostic psychologique
        </p>

        <h1 className="gradient-text text-4xl font-bold md:text-6xl">
          Life Décision
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          En 2 minutes, identifiez votre manière naturelle de prendre des décisions
          et les mécanismes invisibles qui influencent vos choix importants.
        </p>

        <p className="mt-4 text-sm text-slate-400">
          ✓ Test rapide • ✓ 2 minutes • ✓ Analyse décisionnelle
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2 md:grid-cols-3">
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2 text-sm text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        <Link href="/start" className="primary-btn mt-10">
          Découvrir mon profil décisionnel
        </Link>

        <p className="mt-6 text-sm text-slate-400">
          🔎 3 200 personnes ont déjà fait ce diagnostic cette semaine
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Analyse proposée par <span className="underline">Cabinet Astrae</span>
        </p>

      </div>
    </section>
  );
}
