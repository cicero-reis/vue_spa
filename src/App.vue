<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { onMounted } from "vue";
import { useNotificationStore } from "@/stores/notifications";
import NotificationBadge from "@/components/NotificationBadge.vue";

const store = useNotificationStore();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(() => console.log("Service Worker registrado"));
}

onMounted(async () => {
  await store.register();
  store.listenForegroundMessages();
});

</script>

<template>
  <Navbar />
  <NotificationBadge />
  <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
          <component :is="Component" />
      </transition>
  </router-view>
  <Footer />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
