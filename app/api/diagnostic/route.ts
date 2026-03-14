import { NextResponse } from 'next/server';
import { evaluateQuiz, type DiagnosticResult, type QuizSubmission } from '@/lib/quiz';

export async function POST(request: Request) {
  const body = (await request.json()) as { answers?: QuizSubmission };

  if (!body.answers) {
    return NextResponse.json({ error: 'Réponses manquantes' }, { status: 400 });
  }

  const result = evaluateQuiz(body.answers);
  return NextResponse.json(result);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { result?: DiagnosticResult };
  const result = body.result;

  if (!result) {
    return NextResponse.json({ error: 'Résultat manquant' }, { status: 400 });
  }

  const fallback = `Votre score est de ${result.score}%.\n\nVous avez un profil ${result.profile.title}. Priorisez une décision à fort impact cette semaine et appuyez-vous sur vos points forts pour passer à l'action.`;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ analysis: fallback });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'Tu es un coach décisionnel. Réponds en français, style clair, actionnable, bienveillant. 120 à 180 mots.'
          },
          {
            role: 'user',
            content: `Profil: ${result.profile.title}. Score: ${result.score}%. Radar: ${JSON.stringify(
              result.radarData
            )}. Rédige une analyse personnalisée avec 3 conseils pratiques.`
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      return NextResponse.json({ analysis: fallback });
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({ analysis: content || fallback });
  } catch {
    return NextResponse.json({ analysis: fallback });
  }
}
