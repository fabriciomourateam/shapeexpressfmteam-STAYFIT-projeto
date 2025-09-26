// Service Worker simplificado para PWA
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
  // Apenas log, sem cache para evitar problemas
  console.log('Fetch interceptado:', event.request.url);
});