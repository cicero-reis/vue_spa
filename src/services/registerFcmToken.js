import { messaging, getFcmToken  } from "@/services/firebase"
import { fmc } from '@/http/user-api'
import { useAuthStore } from '@/stores/auth';

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

    const store = useAuthStore()

    // Envia para o backend (Laravel)
    await fmc(store.user.id, { fcm_token: token });

  } catch (error) {
    console.error("Erro ao registrar token FCM:", error);
  }
};

export default registerFcmToken
