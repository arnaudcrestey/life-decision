import type { ProfileType } from "@/lib/quiz";

export function ResultCard({ profile, score }: { profile: ProfileType; score: number }) {
  return (
    <section className="glass-card p-6">
      <p className="mb-1 text-sm uppercase tracking-wide text-cyan-300">Votre profil</p>
      <h2 className="text-2xl font-semibold text-white">{profile.title}</h2>
      <p className="mt-2 text-slate-300">{profile.summary}</p>

      <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/40 p-4">
        <p className="text-sm text-slate-400">Score d&apos;alignement décisionnel</p>
        <p className="text-3xl font-bold text-cyan-300">{score}%</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 font-medium text-violet-300">Points de vigilance</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
            {profile.vigilance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-medium text-cyan-300">Recommandations de progression</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
            {profile.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
