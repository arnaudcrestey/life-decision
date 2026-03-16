import { NextResponse } from "next/server";
// @ts-ignore
import nodemailer from "nodemailer";

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

  try {

    const body = (await request.json()) as Partial<LeadPayload>;

    console.log("Lead reçu :", body);

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
      return NextResponse.json(
        { error: "Champs incomplets" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const htmlContent = `
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

      <p><strong>Cabinet Astrae</strong></p>
    `;

    const info = await transporter.sendMail({

      from: `"Life Decision" <${process.env.EMAIL_USER}>`,

      // envoi au client + copie à toi
      to: [body.email, process.env.EMAIL_USER],

      subject: "Votre analyse Life Decision",

      html: htmlContent
    });

    console.log("Email envoyé :", info);

    return NextResponse.json({ success: true });

  } catch (error) {

    console.error("Erreur email :", error);

    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );

  }

}
