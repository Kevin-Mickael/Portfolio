const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const xml2js = require('xml2js');

async function getSitemapUrls(sitemapPath) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);
  return result.urlset.url.map(u => u.loc[0]);
}

async function testUrl(url, userAgent) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': userAgent },
      timeout: 10000
    });
    return { url, status: res.status };
  } catch (e) {
    return { url, status: 'ERROR', error: e.message };
  }
}

(async () => {
  const urls = await getSitemapUrls('public/sitemap.xml');
  for (const ua of ['Bingbot', 'YandexBot']) {
    console.log(`\nTest pour ${ua}:`);
    for (const url of urls) {
      const { status, error } = await testUrl(url, ua);
      if (status === 404) {
        console.log(`${url} => HTTP 404 (NOT FOUND)`);
      } else if (status === 'ERROR') {
        console.log(`${url} => ERREUR: ${error}`);
      } else {
        console.log(`${url} => HTTP ${status}`);
      }
    }
  }
})(); 