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

  } catch (error) {

    console.error("Erreur diagnostic :", error);

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

    const fallback = `Votre score décisionnel est de ${result.score}%.\n\nVotre profil dominant est : ${result.profile.title}. Ce résultat indique certaines tendances dans votre manière de prendre des décisions. Vous disposez déjà de ressources utiles pour avancer, mais certaines dynamiques personnelles peuvent influencer vos choix.`;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ analysis: fallback });
    }

    const prompt = `
Vous êtes un expert en prise de décision et en psychologie comportementale.

IMPORTANT
Le score décisionnel exact de cette personne est : ${result.score}%.
Ce score doit être repris exactement dans l’analyse.

Profil détecté : ${result.profile.title}

Radar décisionnel :
${JSON.stringify(result.radarData)}

OBJECTIF

Aider l'utilisateur à comprendre rapidement :
- sa manière actuelle de prendre des décisions
- ses forces décisionnelles
- les mécanismes qui peuvent freiner ses choix

RÈGLES

- Utiliser "vous"
- Ne jamais dire "la personne"
- Texte naturel et crédible
- 60 à 80 mots maximum
- Mentionner exactement ${result.score}%

STRUCTURE

Analyse

Expliquez ce que signifie un score de ${result.score}% dans la prise de décision.

Terminez en expliquant que certaines dynamiques décisionnelles peuvent être liées à la personnalité, à l’histoire de vie ou aux cycles personnels.

Mentionnez que le Cabinet Astrae propose une analyse plus approfondie grâce à l’étude du thème astral.
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
                "Tu es un spécialiste de la prise de décision et du comportement humain. Réponds en français dans un style clair, naturel et professionnel."
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
      console.error("Erreur OpenAI :", response.status);
      return NextResponse.json({ analysis: fallback });
    }

    const data = await response.json();

    const analysis =
      data?.choices?.[0]?.message?.content?.trim() || fallback;

    return NextResponse.json({ analysis });

  } catch (error) {

    console.error("Erreur analyse GPT :", error);

    return NextResponse.json({
      analysis:
        "Analyse indisponible pour le moment. Merci de réessayer dans quelques instants."
    });

  }

}
