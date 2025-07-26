// Script post-déploiement pour notifier IndexNow
// Usage : node scripts/notify-indexnow.js

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const SITE_URL = process.env.SITE_URL || 'https://creativfolio.com';
const ENDPOINT = `${SITE_URL}/api/indexnow`;

(async () => {
  console.log(`🔔 Notification IndexNow via ${ENDPOINT} ...`);
  try {
    const res = await fetch(ENDPOINT, { method: 'GET' });
    const text = await res.text();
    if (res.ok) {
      console.log('✅ IndexNow notifié avec succès !');
      console.log(text);
    } else {
      console.error(`❌ Erreur lors de la notification IndexNow: ${res.status} ${res.statusText}`);
      console.error(text);
      process.exit(1);
    }
  } catch (e) {
    console.error('❌ Exception lors de la notification IndexNow:', e.message);
    process.exit(1);
  }
})(); 