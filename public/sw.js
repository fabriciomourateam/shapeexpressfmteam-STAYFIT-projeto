// Service Worker para PWA com suporte a SPA e Notificações
const CACHE_NAME = 'shape-express-v4.0.0';

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
  
  // Para rotas específicas do SPA, sempre retornar index.html
  const url = new URL(event.request.url);
  const spaRoutes = ['/dietas', '/treinos', '/suporte', '/perfil', '/desafio', '/ranking', '/welcome'];
  
  if (spaRoutes.some(route => url.pathname.startsWith(route))) {
    event.respondWith(
      fetch('/index.html').catch(() => {
        return caches.match('/index.html');
      })
    );
    return;
  }
  
  // Para outros recursos, apenas log
  console.log('Fetch interceptado:', event.request.url);
});

// Notificações Push
self.addEventListener('push', (event) => {
  console.log('Push notification recebida:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do Shape Express',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'Abrir App',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Shape Express', options)
  );
});

// Clique na notificação
self.addEventListener('notificationclick', (event) => {
  console.log('Notificação clicada:', event);
  
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Notificações periódicas (diárias)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATIONS') {
    scheduleDailyNotifications();
  }
});

function scheduleDailyNotifications() {
  // Notificação matinal (8h)
  scheduleNotification('Bom dia! 🌅', 'Que tal começar o dia bebendo um copo d\'água? Hidratação é fundamental!', 8, 0);
  
  // Notificação de almoço (12h)
  scheduleNotification('Hora do almoço! 🍽️', 'Lembre-se de seguir seu plano alimentar. Você está no caminho certo!', 12, 0);
  
  // Notificação de treino (18h)
  scheduleNotification('Hora do treino! 💪', 'Vamos treinar? Seu corpo e mente agradecem!', 18, 0);
  
  // Notificação noturna (21h)
  scheduleNotification('Planejamento do amanhã! 📋', 'Que tal planejar suas refeições de amanhã? Organização é sucesso!', 21, 0);
}

function scheduleNotification(title, body, hour, minute) {
  const now = new Date();
  const notificationTime = new Date();
  notificationTime.setHours(hour, minute, 0, 0);
  
  // Se já passou o horário hoje, agendar para amanhã
  if (notificationTime <= now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }
  
  const timeUntilNotification = notificationTime.getTime() - now.getTime();
  
  setTimeout(() => {
    self.registration.showNotification(title, {
      body: body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      vibrate: [200, 100, 200],
      tag: `daily-${hour}`,
      requireInteraction: false
    });
    
    // Reagendar para o próximo dia
    scheduleNotification(title, body, hour, minute);
  }, timeUntilNotification);
}