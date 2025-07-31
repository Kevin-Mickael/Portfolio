// Script pour désactiver la protection automatique des emails par Cloudflare
// et éviter les erreurs 404 sur /cdn-cgi/l/email-protection

(function() {
  'use strict';
  
  // Désactiver la protection automatique des emails
  if (typeof window.CloudFlare !== 'undefined') {
    window.CloudFlare.decodeemail = function() {
      // Ne fait rien - empêche l'obfuscation automatique
      return false;
    };
  }
  
  // Restaurer tous les emails obfusqués existants
  document.addEventListener('DOMContentLoaded', function() {
    var emailLinks = document.querySelectorAll('a[href*="cdn-cgi/l/email-protection"]');
    
    emailLinks.forEach(function(link) {
      // Rediriger vers la page de contact
      link.href = '/contact';
      link.setAttribute('aria-label', 'Contactez-nous par email');
      
      // Optionnel: remplacer le texte si nécessaire
      if (link.textContent.includes('[email')) {
        link.textContent = 'Contactez-nous';
      }
    });
  });
})();
