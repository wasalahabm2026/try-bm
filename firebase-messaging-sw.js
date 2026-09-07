self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    data = {
      title: "يوجد طلب جديد",
      body: event.data ? event.data.text() : "لديك طلب جديد، افتح لوحة التحكم لمراجعته.",
    };
  }

  const title = data.title || "يوجد طلب جديد";
  const options = {
    body: data.body || "لديك طلب جديد، افتح لوحة التحكم لمراجعته.",
    icon: data.icon || "/favicon.ico",
    badge: data.badge || "/favicon.ico",
    data: {
      url: data.url || "/",
    },
    tag: data.tag || "waslha-new-order",
    requireInteraction: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl =
    (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
