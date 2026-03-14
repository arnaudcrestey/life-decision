import { NextResponse } from 'next/server';

type LeadPayload = {
  firstName: string;
  email: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<LeadPayload>;

  if (!body.firstName || !body.email || !body.birthDate || !body.birthTime || !body.birthPlace) {
    return NextResponse.json({ error: 'Champs incomplets' }, { status: 400 });
  }

  return NextResponse.json({ success: true, lead: body });
}
