import { defineStore } from "pinia";
import registerFcmToken from "@/services/firebase/registerFcmToken";
import { onFcmMessage } from "@/services/firebase/firebase"

export const useNotificationStore = defineStore("notifications", {
  state: () => ({
    notifications: JSON.parse(localStorage.getItem("notifications")) || [],
    fcmToken: null,
  }),

  actions: {
    async register() {
      await registerFcmToken()
    },

    listenForegroundMessages() {
      onFcmMessage((payload) => {
        const { title, body } = payload.notification;
        const store = useNotificationStore();
        store.addNotification({ title, body });
      });
    },

    addNotification(notification) {
      this.notifications.push(notification);
      //localStorage.setItem("notifications", JSON.stringify(this.notifications));
    },

    clearNotifications() {
      this.notifications = [];
      //localStorage.removeItem("notifications");
    },
  },
});
