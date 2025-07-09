export async function onRequestPost(context) {
  const { request, env } = context;
  const data = await request.json();

  const apiKey = env.BREVO_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Brevo API key not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

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
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    const error = await brevoRes.json();
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 