'use client';

import { useEffect, useState } from 'react';
import { RadarChart } from '@/components/radar-chart';
import { ResultCard } from '@/components/result-card';
import { ShareButtons } from '@/components/share-buttons';
import type { DiagnosticResult } from '@/lib/quiz';

type LeadForm = {
  firstName: string;
  email: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

const initialForm: LeadForm = {
  firstName: '',
  email: '',
  birthDate: '',
  birthTime: '',
  birthPlace: ''
};

export default function ResultPage() {
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [analysis, setAnalysis] = useState<string>('Analyse en cours…');
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('lifeDecisionResult');
    if (!stored) return;
    const parsed = JSON.parse(stored) as DiagnosticResult;
    setResult(parsed);

    fetch('/api/diagnostic', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ result: parsed })
    })
      .then((res) => res.json())
      .then((data: { analysis: string }) => {
        setAnalysis(data.analysis || 'Analyse indisponible pour le moment.');
      })
      .catch(() => {
        setAnalysis('Analyse indisponible pour le moment.');
      });
  }, []);

  const onChange = (field: keyof LeadForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmitLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      setMessage('Merci ! Votre analyse approfondie vous sera envoyée.');
      setForm(initialForm);
      return;
    }

    setMessage('Une erreur est survenue. Merci de réessayer.');
  };

  if (!result) {
    return <p className="text-slate-300">Aucun résultat trouvé. Veuillez compléter le diagnostic.</p>;
  }

  return (
    <section className="space-y-6">
      <ResultCard profile={result.profile} score={result.score} />
      <RadarChart data={result.radarData} />

      <article className="glass-card p-6">
        <h2 className="text-xl font-semibold">Analyse personnalisée</h2>
        <p className="mt-3 whitespace-pre-line text-slate-300">{analysis}</p>
      </article>

      <section className="glass-card p-6">
        <h2 className="text-xl font-semibold">Recevoir mon analyse approfondie</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={onSubmitLead}>
          <input
            value={form.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            placeholder="Prénom"
            required
            className="rounded-lg border border-white/15 bg-slate-900/50 px-3 py-2"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Email"
            required
            className="rounded-lg border border-white/15 bg-slate-900/50 px-3 py-2"
          />
          <input
            type="date"
            value={form.birthDate}
            onChange={(e) => onChange('birthDate', e.target.value)}
            required
            className="rounded-lg border border-white/15 bg-slate-900/50 px-3 py-2"
          />
          <input
            type="time"
            value={form.birthTime}
            onChange={(e) => onChange('birthTime', e.target.value)}
            required
            className="rounded-lg border border-white/15 bg-slate-900/50 px-3 py-2"
          />
          <input
            value={form.birthPlace}
            onChange={(e) => onChange('birthPlace', e.target.value)}
            placeholder="Lieu de naissance"
            required
            className="rounded-lg border border-white/15 bg-slate-900/50 px-3 py-2 md:col-span-2"
          />
          <button type="submit" className="primary-btn md:col-span-2">
            Recevoir mon analyse approfondie
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-slate-300">{message}</p>}
      </section>

      <ShareButtons />
    </section>
  );
}
