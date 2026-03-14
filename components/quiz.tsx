'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { QuizSubmission } from '@/lib/quiz';
import { questions } from '@/lib/quiz';

export function Quiz() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizSubmission>({});
  const [error, setError] = useState<string>('');

  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  const onSelect = (id: number, value: 1 | 2 | 3) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError('');
  };

  const onSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setError('Merci de répondre aux 10 questions.');
      return;
    }

    const response = await fetch('/api/diagnostic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });

    if (!response.ok) {
      setError('Une erreur est survenue, veuillez réessayer.');
      return;
    }

    const data = await response.json();
    localStorage.setItem('lifeDecisionResult', JSON.stringify(data));
    router.push('/resultat');
  };

  return (
    <section className="glass-card p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm text-slate-300">
          <span>Progression</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((question) => (
          <article key={question.id} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
            <p className="mb-3 font-medium text-slate-100">
              {question.id}. {question.text}
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {question.answers.map((option) => {
                const active = answers[question.id] === option.value;
                return (
                  <button
                    type="button"
                    key={option.label}
                    onClick={() => onSelect(question.id, option.value)}
                    className={`rounded-lg px-3 py-2 text-sm transition ${
                      active
                        ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950'
                        : 'border border-white/20 bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-rose-300">{error}</p>}

      <div className="mt-6">
        <button type="button" onClick={onSubmit} className="primary-btn w-full sm:w-auto">
          Voir mon résultat
        </button>
      </div>
    </section>
  );
}
