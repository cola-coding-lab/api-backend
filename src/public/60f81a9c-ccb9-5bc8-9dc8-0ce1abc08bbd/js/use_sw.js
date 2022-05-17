/************************
 * USE A SERVICE WORKER *
 ************************/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
             .register('sw.js', {scope: document.baseURI})
             .then((serviceWorker) => {
               console.log('Service Worker for PWA registered: ', serviceWorker);
             })
             .catch((error) => {
               console.error('Error registering the Service Worker for PWA: ', error);
             });
  });
} else {
  console.error('ServiceWorker are not supported by your browser!');
}
