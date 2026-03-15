import { NextResponse } from "next/server";
import { computeResults, type DiagnosticResult } from "@/lib/quiz";

type QuizAnswer = {
  questionId: number;
  value: number;
};

export async function POST(request: Request) {

  try {

    const body = await request.json() as { answers?: QuizAnswer[] };

    if (!body.answers || body.answers.length === 0) {
      return NextResponse.json(
        { error: "Réponses manquantes" },
        { status: 400 }
      );
    }

    const result = computeResults(body.answers);

    return NextResponse.json(result);

  } catch {

    return NextResponse.json(
      { error: "Erreur de traitement du diagnostic" },
      { status: 500 }
    );

  }

}

export async function PUT(request: Request) {

  try {

    const result = await request.json() as DiagnosticResult;

    if (!result || !result.profile) {
      return NextResponse.json(
        { error: "Résultat manquant" },
        { status: 400 }
      );
    }

    const fallback = `Votre score décisionnel est de ${result.score}%.\n\nVotre profil dominant est : ${result.profile.title}. Vous disposez déjà de certaines ressources pour prendre des décisions efficaces. Prenez le temps de clarifier vos priorités et concentrez-vous sur une décision concrète à fort impact dans les prochains jours.`;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ analysis: fallback });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Tu es un coach spécialisé dans la prise de décision. Réponds en français dans un style clair, professionnel et bienveillant. 120 à 180 mots maximum."
            },
            {
              role: "user",
              content: `Profil : ${result.profile.title}.
Score : ${result.score}%.
Radar : ${JSON.stringify(result.radarData)}.

Rédige une analyse personnalisée et donne 3 conseils concrets pour améliorer la prise de décision.`
            }
          ],
          temperature: 0.7
        })
      }
    );

    if (!response.ok) {
      return NextResponse.json({ analysis: fallback });
    }

    const data = await response.json();

    const content =
      data?.choices?.[0]?.message?.content?.trim() || fallback;

    return NextResponse.json({ analysis: content });

  } catch {

    return NextResponse.json({
      analysis:
        "Analyse indisponible pour le moment. Merci de réessayer dans quelques instants."
    });

  }

}
