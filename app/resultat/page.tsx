"use client";

import { useEffect, useMemo, useState } from "react";
import { RadarChart } from "@/components/radar-chart";
import { ResultCard } from "@/components/result-card";
import { ShareButtons } from "@/components/share-buttons";
import { computeResults } from "@/lib/quiz";

export default function ResultPage() {
  const [answers, setAnswers] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analysisRequested, setAnalysisRequested] = useState(false);

  useEffect(() => {
    const rawAnswers = localStorage.getItem("quizAnswers");

    if (rawAnswers) {
      setAnswers(JSON.parse(rawAnswers));
    }
  }, []);

  const result = useMemo(() => {
    if (!answers.length) return null;

    return computeResults(answers);
  }, [answers]);

  const alignmentScore = useMemo(() => {
    if (!result?.radarData) return 0;

    const values = result.radarData.map((item: any) => item.value);
    const avg = values.reduce((a: number, b: number) => a + b, 0) / values.length;
    const normalized = ((avg - 1) / 2) * 100;

    return Math.round(normalized);
  }, [result]);

  useEffect(() => {
    if (!result || !alignmentScore || analysisRequested) return;

    setAnalysisRequested(true);

    async function generateAnalysis() {
      try {
        const res = await fetch("/api/diagnostic", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...result,
            score: alignmentScore,
          }),
        });

        const data = await res.json();

        if (data?.analysis) {
          setAnalysis(data.analysis);
        }
      } catch {
        setAnalysis("Analyse indisponible pour le moment.");
      }
    }

    generateAnalysis();
  }, [result, alignmentScore, analysisRequested]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-10">
      <h1 className="text-4xl font-bold">Votre profil décisionnel</h1>

      <p className="mt-2 text-white/75">
        Analyse générée automatiquement à partir de vos réponses.
      </p>

      {result && (
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <ResultCard profile={result.profile} score={alignmentScore} />

          <RadarChart data={result.radarData} />
        </section>
      )}

      <section className="glass-card mt-8 p-6">
        <h3 className="mb-3 text-xl font-semibold">Analyse personnalisée</h3>

        {!analysis && (
          <p className="text-white/60 italic">Analyse en cours… 🔎</p>
        )}

        {analysis && (
          <p className="leading-relaxed text-white/80">{analysis}</p>
        )}
      </section>

      <section className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-10 text-center shadow-xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Exemple de point d’entrée interactif
        </p>

        <h2 className="mb-4 text-3xl font-semibold">
          Transformer ce concept en outil pour votre activité
        </h2>

        <p className="mx-auto max-w-3xl leading-relaxed text-white/80">
          Life Decision est une démonstration de parcours interactif. Ce type
          d’expérience peut être adapté à votre domaine pour qualifier une
          demande, préparer un rendez-vous, valoriser votre expertise ou créer un
          premier contact plus utile.
        </p>

        <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 font-semibold text-cyan-300">
              Qualifier une demande
            </h3>
            <p className="text-sm text-white/70">
              Comprendre rapidement le besoin avant le premier échange.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 font-semibold text-cyan-300">
              Valoriser une expertise
            </h3>
            <p className="text-sm text-white/70">
              Transformer votre savoir-faire en expérience claire et crédible.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 font-semibold text-cyan-300">
              Créer un point d’entrée
            </h3>
            <p className="text-sm text-white/70">
              Remplacer un simple formulaire par un parcours plus engageant.
            </p>
          </div>
        </div>

        <a
          href="mailto:contact@systia.fr?subject=Demande%20d%E2%80%99adaptation%20%E2%80%94%20Point%20d%E2%80%99entr%C3%A9e%20interactif"
          className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-4 text-lg font-semibold text-white transition hover:opacity-90"
        >
          Adapter ce système à mon activité
        </a>
      </section>

      {result && (
        <section className="mt-12 text-center">
          <ShareButtons
            profile={result.profile?.title ?? "Profil décisionnel"}
            score={alignmentScore}
          />
        </section>
      )}
    </main>
  );
}
