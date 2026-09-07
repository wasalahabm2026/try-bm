importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyA_VJBfvfTBdjt3lkCfl_wZA10jMIIbSVc',
  authDomain: 'wasallaha-orders.firebaseapp.com',
  projectId: 'wasallaha-orders',
  storageBucket: 'wasallaha-orders.firebasestorage.app',
  messagingSenderId: '875630202473',
  appId: '1:875630202473:web:58b413ab40e2d276b4dcf8',
  measurementId: 'G-LPEKNPWYSJ'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = 'يوجد طلب جديد';
  const notificationOptions = {
    body: 'لديك طلب جديد، افتح لوحة التحكم لمراجعته.',
    icon: '/favicon.ico',
    data: { url: '/index.html' }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification?.data?.url || '/';
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if ('focus' in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(targetUrl);
  }));
});
