import { messaging, getFcmToken  } from "@/services/firebase"
import { fmc } from '@/http/auth-api'

const registerFcmToken = async () => {
  try {
    // Solicita permissão de notificações
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("Permissão de notificação negada");
      return;
    }

    // Pega o token do Firebase para este navegador
    const token = await getFcmToken(messaging, {
      vapidKey: import.meta.env.VITE_FCM_VAPID_KEY,
    });

    if (!token) {
      console.warn("Não foi possível obter o token FCM");
      return;
    }

    console.log("FCM token:", token);

    // Envia para o backend (Laravel)
    await fmc({ fcm_token: token });

  } catch (error) {
    console.error("Erro ao registrar token FCM:", error);
  }
};

export default registerFcmToken
