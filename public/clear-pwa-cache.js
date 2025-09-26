// Script para limpar cache do PWA
// Execute no console do navegador

// Limpar service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}

// Limpar cache
if ('caches' in window) {
  caches.keys().then(function(names) {
    for (let name of names) {
      caches.delete(name);
    }
  });
}

// Limpar localStorage
localStorage.clear();

// Limpar sessionStorage
sessionStorage.clear();

console.log('Cache PWA limpo! Recarregue a página.');
