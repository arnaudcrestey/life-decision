"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnalysePage() {

  const router = useRouter();

  useEffect(() => {

    const timer = setTimeout(() => {
      router.push("/resultat");
    }, 2500);

    return () => clearTimeout(timer);

  }, [router]);

  return (
    <div className="flex flex-1 items-center justify-center px-4">

      <div className="glass-card w-full max-w-xl p-10 text-center">

        <h1 className="text-2xl font-semibold mb-6">
          Analyse en cours...
        </h1>

        <div className="space-y-3 text-sm text-slate-300">
          <p>✔ Analyse des réponses</p>
          <p>✔ Évaluation du profil décisionnel</p>
          <p>✔ Génération des recommandations</p>
        </div>

        <div className="mt-6 h-2 w-full rounded bg-slate-800 overflow-hidden">
          <div className="h-full animate-pulse bg-gradient-to-r from-cyan-400 to-violet-500 w-full"/>
        </div>

      </div>

    </div>
  );
}
