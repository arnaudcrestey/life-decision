"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRandomizedQuiz } from "@/lib/quiz";

type Answer = {
  questionId: number;
  value: number;
};

export default function Quiz() {
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const q = getRandomizedQuiz();
    setQuestions(q);
  }, []);

  if (!questions.length) return null;

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  function handleAnswer(value: number) {
    const updated = [
      ...answers,
      { questionId: question.id, value }
    ];

    setAnswers(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem("quizAnswers", JSON.stringify(updated));
      router.push("/resultat");
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="glass-card w-full max-w-2xl p-8 text-center md:p-12">

        {/* progress */}
        <div className="mb-6 text-sm text-slate-400">
          Question {current + 1} / {questions.length}
        </div>

        <div className="h-2 w-full rounded bg-slate-800 mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* question */}
        <h2 className="text-2xl font-semibold mb-8">
          {question.label}
        </h2>

        {/* answers */}
        <div className="space-y-4">
          {question.answers.map((a: any, i: number) => (
            <button
              key={i}
              onClick={() => handleAnswer(a.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/40 px-6 py-4 text-left text-slate-200 hover:border-cyan-400 hover:bg-slate-900 transition"
            >
              {a.text}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
