// Script para forçar limpeza completa do cache PWA
// Execute no console do navegador

console.log('Iniciando limpeza forçada do cache PWA...');

// 1. Limpar todos os service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    console.log('Encontrados', registrations.length, 'service workers');
    for(let registration of registrations) {
      console.log('Removendo service worker:', registration.scope);
      registration.unregister();
    }
  });
}

// 2. Limpar todos os caches
if ('caches' in window) {
  caches.keys().then(function(names) {
    console.log('Encontrados', names.length, 'caches');
    for (let name of names) {
      console.log('Removendo cache:', name);
      caches.delete(name);
    }
  });
}

// 3. Limpar storage
localStorage.clear();
sessionStorage.clear();
console.log('Storage limpo');

// 4. Limpar IndexedDB
if ('indexedDB' in window) {
  indexedDB.databases().then(databases => {
    databases.forEach(db => {
      indexedDB.deleteDatabase(db.name);
      console.log('Removido IndexedDB:', db.name);
    });
  });
}

// 5. Forçar reload
setTimeout(() => {
  console.log('Recarregando página...');
  window.location.reload(true);
}, 2000);

console.log('Limpeza forçada iniciada! A página será recarregada em 2 segundos.');
