import { XMLParser } from 'fast-xml-parser';

// Helper pour récupérer la clé IndexNow de façon sécurisée
function getIndexNowKey(context) {
  // Priorité à la variable d'environnement
  if (context.env && context.env.INDEXNOW_KEY) return context.env.INDEXNOW_KEY;
  // Fallback (dev local uniquement)
  return '6426ec9d160841d0bf9e74724efb504b';
}

export async function onRequestPost(context) {
  const INDEXNOW_API = 'https://api.indexnow.org/IndexNow';
  const KEY = getIndexNowKey(context);
  const HOST = 'creativfolio.com';
  const KEY_LOCATION = `https://${HOST}/${KEY}`;

  let urlList;
  try {
    const body = await context.request.json();
    urlList = body.urlList;
    if (!Array.isArray(urlList) || urlList.length === 0) {
      return new Response(JSON.stringify({ error: 'urlList must be a non-empty array.' }), { status: 400 });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), { status: 400 });
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList
  };

  try {
    const indexnowRes = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    const text = await indexnowRes.text();
    if (!indexnowRes.ok) {
      return new Response(JSON.stringify({ error: 'IndexNow API error', status: indexnowRes.status, body: text }), { status: 502 });
    }
    return new Response(text, {
      status: indexnowRes.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Exception when calling IndexNow API', details: e.message }), { status: 500 });
  }
}

export async function onRequestGet(context) {
  const INDEXNOW_API = 'https://api.indexnow.org/IndexNow';
  const KEY = getIndexNowKey(context);
  const HOST = 'creativfolio.com';
  const KEY_LOCATION = `https://${HOST}/${KEY}`;

  // Récupérer le sitemap
  let sitemapRes, sitemapText;
  try {
    sitemapRes = await fetch(`https://${HOST}/sitemap.xml`);
    if (!sitemapRes.ok) {
      return new Response(JSON.stringify({ error: 'Impossible de récupérer le sitemap.', status: sitemapRes.status }), { status: 502 });
    }
    sitemapText = await sitemapRes.text();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Exception lors de la récupération du sitemap.', details: e.message }), { status: 500 });
  }

  // Parser le XML pour extraire les URLs
  const parser = new XMLParser({ ignoreAttributes: false });
  let urlList = [];
  try {
    const parsed = parser.parse(sitemapText);
    if (!parsed.urlset || !parsed.urlset.url) {
      return new Response(JSON.stringify({ error: 'Aucune URL trouvée dans le sitemap.' }), { status: 400 });
    }
    // Peut être un objet ou un tableau
    if (Array.isArray(parsed.urlset.url)) {
      urlList = parsed.urlset.url.map(u => u.loc);
    } else if (parsed.urlset.url.loc) {
      urlList = [parsed.urlset.url.loc];
    } else {
      return new Response(JSON.stringify({ error: 'Format inattendu du sitemap.' }), { status: 400 });
    }
    if (!Array.isArray(urlList) || urlList.length === 0) {
      return new Response(JSON.stringify({ error: 'Aucune URL valide trouvée dans le sitemap.' }), { status: 400 });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Erreur lors du parsing du sitemap.', details: e.message }), { status: 500 });
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList
  };

  try {
    const indexnowRes = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    const text = await indexnowRes.text();
    if (!indexnowRes.ok) {
      return new Response(JSON.stringify({ error: 'IndexNow API error', status: indexnowRes.status, body: text }), { status: 502 });
    }
    return new Response(text, {
      status: indexnowRes.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Exception when calling IndexNow API', details: e.message }), { status: 500 });
  }
} 