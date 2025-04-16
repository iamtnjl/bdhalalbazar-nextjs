importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCiwhvYpRrdRmg8Tk3S1lUf09__M2Hf5dk",
  authDomain: "bdhalalbazar-92761.firebaseapp.com",
  projectId: "bdhalalbazar-92761",
  messagingSenderId: "316129468082",
  appId: "1:316129468082:web:6f6703b0343ba40490f3ab",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo/logo.png",
  });
});
