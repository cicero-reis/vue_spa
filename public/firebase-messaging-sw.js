importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCPL51Ygwf9LgrFh7lvCorJmaEkmUUT_pE",
  authDomain: "fir-tasks-f9972.firebaseapp.com",
  projectId: "fir-tasks-f9972",
  storageBucket: "fir-tasks-f9972.firebasestorage.app",
  messagingSenderId: "792130056046",
  appId: "1:792130056046:web:599fa23c0678418a62db7f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Mensagem em background:', payload);
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions);
  
});