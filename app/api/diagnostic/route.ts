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

    const fallback = `Votre score décisionnel est de ${result.score}%.\n\nVotre profil dominant est : ${result.profile.title}. Ce résultat suggère certaines tendances dans votre manière de prendre des décisions. Vous disposez déjà de ressources pour avancer, mais certaines dynamiques personnelles peuvent influencer vos choix.`;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ analysis: fallback });
    }

    const prompt = `
Vous êtes un expert en prise de décision et en psychologie comportementale.

Le score décisionnel exact est : ${result.score}%.
Profil détecté : ${result.profile.title}

Radar :
${JSON.stringify(result.radarData)}

Rédigez une analyse courte (60 à 80 mots maximum).

Règles :
- Utiliser "vous"
- Mentionner exactement le score ${result.score}%
- Ton clair et crédible
- Expliquer ce que signifie ce score dans la manière de prendre des décisions

Terminez par une phrase expliquant que certaines dynamiques décisionnelles peuvent être liées à la personnalité, l’histoire de vie ou les cycles personnels, et mentionnez que le Cabinet Astrae propose une analyse plus approfondie grâce à l’étude du thème astral.
`;

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
                "Tu es un spécialiste de la prise de décision et du comportement humain. Réponds en français, style clair et naturel."
            },
            {
              role: "user",
              content: prompt
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
