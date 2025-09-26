// Service Worker para PWA com suporte a SPA
const CACHE_NAME = 'shape-express-v3.0.0';

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

// Ativar service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
  event.waitUntil(self.clients.claim());
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  // Para requisições de navegação (SPA), sempre retornar index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html');
      })
    );
    return;
  }
  
  // Para outros recursos, apenas log
  console.log('Fetch interceptado:', event.request.url);
});