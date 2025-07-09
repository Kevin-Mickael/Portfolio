export async function onRequestPost(context) {
  const { request, env } = context;
  let data;
  try {
    data = await request.json();
    console.log('Contact form data received:', data);
  } catch (err) {
    console.error('Erreur de parsing JSON:', err);
    return new Response(JSON.stringify({ error: 'Erreur de parsing JSON', details: String(err) }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('Brevo API key not configured');
    return new Response(JSON.stringify({ error: 'Brevo API key not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let brevoRes;
  try {
    brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
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
  } catch (err) {
    console.error('Erreur lors de la requête à Brevo:', err);
    return new Response(JSON.stringify({ error: 'Erreur lors de la requête à Brevo', details: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (brevoRes.ok) {
    console.log('Email envoyé avec succès via Brevo');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    let error;
    try {
      error = await brevoRes.json();
    } catch (err) {
      error = { message: 'Erreur inconnue lors de la lecture de la réponse Brevo', details: String(err) };
    }
    console.error('Erreur Brevo:', error);
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 