import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Charger la clé API Brevo depuis les variables d'environnement
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Brevo API key not configured.' }, { status: 500 });
  }

  // Préparer la requête à l'API Brevo
  const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: `${data.firstName} ${data.lastName}`, email: data.email },
      to: [{ email: 'andriatsilavokevin@gmail.com', name: 'Kevin Andriatsilavo' }],
      subject: data.subject,
      htmlContent: `<p><strong>Nom:</strong> ${data.firstName} ${data.lastName}<br/><strong>Email:</strong> ${data.email}<br/><br/>${data.message.replace(/\n/g, '<br/>')}</p>`
    })
  });

  if (brevoRes.ok) {
    return NextResponse.json({ success: true });
  } else {
    const error = await brevoRes.json();
    return NextResponse.json({ error }, { status: 500 });
  }
} 