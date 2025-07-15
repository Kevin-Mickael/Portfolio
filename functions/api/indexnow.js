import { XMLParser } from 'fast-xml-parser';

export async function onRequestPost(context) {
  const INDEXNOW_API = 'https://api.indexnow.org/IndexNow';
  const KEY = '6426ec9d160841d0bf9e74724efb504b';
  const HOST = 'creativfolio.com';
  const KEY_LOCATION = `https://${HOST}/6426ec9d160841d0bf9e74724efb504b`;

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

  const indexnowRes = await fetch(INDEXNOW_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });

  const text = await indexnowRes.text();
  return new Response(text, {
    status: indexnowRes.status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestGet(context) {
  const INDEXNOW_API = 'https://api.indexnow.org/IndexNow';
  const KEY = '6426ec9d160841d0bf9e74724efb504b';
  const HOST = 'creativfolio.com';
  const KEY_LOCATION = `https://${HOST}/6426ec9d160841d0bf9e74724efb504b`;

  // Récupérer le sitemap
  const sitemapRes = await fetch(`https://${HOST}/sitemap.xml`);
  if (!sitemapRes.ok) {
    return new Response(JSON.stringify({ error: 'Impossible de récupérer le sitemap.' }), { status: 500 });
  }
  const sitemapText = await sitemapRes.text();

  // Parser le XML pour extraire les URLs
  const parser = new XMLParser({ ignoreAttributes: false });
  let urlList = [];
  try {
    const parsed = parser.parse(sitemapText);
    urlList = parsed.urlset.url.map(u => u.loc);
    if (!Array.isArray(urlList)) urlList = [urlList];
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Erreur lors du parsing du sitemap.' }), { status: 500 });
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList
  };

  const indexnowRes = await fetch(INDEXNOW_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload)
  });

  const text = await indexnowRes.text();
  return new Response(text, {
    status: indexnowRes.status,
    headers: { 'Content-Type': 'application/json' }
  });
} 