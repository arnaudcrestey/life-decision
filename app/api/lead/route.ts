import { NextResponse } from "next/server";
// @ts-ignore - nodemailer types sometimes break on Vercel serverless
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
  profile: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadPayload>;

    // validation
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

    // sécurité env
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("EMAIL_USER ou EMAIL_PASS manquant");
      return NextResponse.json(
        { error: "Configuration email incorrecte" },
        { status: 500 }
      );
    }

    // transport SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height:1.6; color:#111;">

    <h2 style="margin-bottom:8px;">🚀 Nouveau lead Life Decision</h2>

    <p style="margin-top:0; color:#555;">
      Un utilisateur vient de compléter le diagnostic.
    </p>

    <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

    <h3 style="margin-bottom:10px;">👤 Informations</h3>

    <p><strong>Prénom :</strong> ${body.firstName}</p>
    <p><strong>Email :</strong> ${body.email}</p>

    <h3 style="margin-top:20px; margin-bottom:10px;">📊 Résultat</h3>

    <p style="font-size:18px;">
      <strong>Score décisionnel :</strong> ${body.score ?? "—"}%
    </p>

    <p>
      <strong>Profil détecté :</strong> ${body.profile ?? "—"}
    </p>

    <h3 style="margin-top:20px; margin-bottom:10px;">🧭 Données personnelles</h3>

    <ul style="padding-left:18px;">
      <li><strong>Date de naissance :</strong> ${body.birthDay}/${body.birthMonth}/${body.birthYear}</li>
      <li><strong>Heure :</strong> ${body.birthHour}:${body.birthMinute}</li>
      <li><strong>Lieu :</strong> ${body.birthPlace}</li>
    </ul>

    <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

    <a href="mailto:${body.email}" style="
      display:inline-block;
      margin-top:15px;
      padding:10px 16px;
      background:#22d3ee;
      color:#fff;
      text-decoration:none;
      border-radius:6px;
      font-weight:bold;
    ">
      Contacter ce lead
    </a>

  </div>
`;

    const mailOptions = {
  from: `"Life Decision" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER!, // UNIQUEMENT toi
  subject: "Nouveau lead Life Decision",
  html: htmlContent
};

    const info = await transporter.sendMail(mailOptions);

    console.log("Email envoyé:", info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur email:", error);

    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
