import { NextResponse } from "next/server";
import { Resend } from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);

type LeadPayload = {
  firstName: string;
  email: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  birthHour: string;
  birthMinute: string;
  birthPlace: string;
  score: number;
};

export async function POST(request: Request) {

  const body = (await request.json()) as Partial<LeadPayload>;

  if (
    !body.firstName ||
    !body.email ||
    !body.birthDay ||
    !body.birthMonth ||
    !body.birthYear ||
    !body.birthHour ||
    !body.birthMinute ||
    !body.birthPlace
  ) {
    return NextResponse.json({ error: "Champs incomplets" }, { status: 400 });
  }

  try {

    await resend.emails.send({
      from: "Astrae <contact@arnaudcrestey.com>",
      to: body.email,
      subject: "Votre analyse Life Decision",
      html: `
        <h2>Bonjour ${body.firstName}</h2>

        <p>Merci d'avoir réalisé le diagnostic <strong>Life Decision</strong>.</p>

        <p><strong>Score décisionnel :</strong> ${body.score}%</p>

        <h3>Informations transmises</h3>

        <ul>
          <li>Date de naissance : ${body.birthDay}/${body.birthMonth}/${body.birthYear}</li>
          <li>Heure : ${body.birthHour}:${body.birthMinute}</li>
          <li>Lieu : ${body.birthPlace}</li>
        </ul>

        <p>Votre analyse personnalisée vous sera envoyée prochainement.</p>

        <p>Cabinet Astrae</p>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Erreur envoi email" },
      { status: 500 }
    );

  }

}
