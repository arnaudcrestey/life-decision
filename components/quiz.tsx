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
    setQuestions(getRandomizedQuiz());
  }, []);

  if (!questions.length) return null;

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  function handleAnswer(value: number) {
    const updated = [...answers, { questionId: question.id, value }];
    setAnswers(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem("quizAnswers", JSON.stringify(updated));
      router.push("/analyse");
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-4">

      <div className="glass-card w-full max-w-2xl p-8 text-center md:p-12 transition-all duration-300">

        {/* progression */}
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Question {current + 1} / {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="h-2 w-full rounded bg-slate-800 mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* question */}
        <div key={question.id} className="transition-all duration-300">

          <div className="text-3xl mb-4">
            🧭
          </div>

          <h2 className="text-2xl font-semibold mb-8">
            {question.label}
          </h2>

          {/* réponses */}
          <div className="space-y-4">

            {question.answers.map((a: any, i: number) => (

              <button
                key={i}
                onClick={() => handleAnswer(a.value)}
                className="
                  w-full rounded-xl border border-white/10
                  bg-slate-900/40 px-6 py-4 text-left
                  text-slate-200 transition-all duration-200
                  hover:border-cyan-400 hover:bg-slate-900
                  active:scale-[0.98]
                "
              >
                {a.text}
              </button>

            ))}

          </div>

          <p className="mt-6 text-xs text-slate-400">
            Répondez spontanément. Il n’y a pas de bonne ou mauvaise réponse.
          </p>

        </div>

      </div>

    </div>
  );
}
