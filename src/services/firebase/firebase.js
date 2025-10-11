import { initializeApp } from "firebase/app";
import { getMessaging, getToken as firebaseGetToken, onMessage as firebaseOnMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FCM_API_KEY,
  authDomain: import.meta.env.VITE_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FCM_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FCM_MESSAGIN_SEDER_ID,
  appId: import.meta.env.VITE_FCM_API
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const getFcmToken = async () => {
  return await firebaseGetToken(messaging, {
    vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
  });
};

const onFcmMessage = (callback) => {
  firebaseOnMessage(messaging, callback);
};

export { messaging, getFcmToken, onFcmMessage };