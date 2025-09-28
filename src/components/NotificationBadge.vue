<template>
  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div
      v-for="n in store.notifications"
      :key="n.task_id"
      class="toast align-items-center border-0 show bg-primary text-white"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="toasts"
    >
      <div class="toast-header">
        <strong class="me-auto">{{ n.title }}</strong>
        <small class="text-light">now</small>
        <button type="button" class="btn-close btn-close-white" @click="removeToast(n.task_id)" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{ n.body }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick, watch } from "vue";
import { useNotificationStore } from "@/stores/notifications";

const store = useNotificationStore();

function removeToast(taskId) {
  const index = store.notifications.findIndex((t) => t.task_id === taskId);
  if (index !== -1) store.notifications.splice(index, 1);
}

async function initToasts() {
  await nextTick();
  const toastEls = document.querySelectorAll(".toast");
  toastEls.forEach((el) => {
    const bsToast = bootstrap.Toast.getOrCreateInstance(el, { autohide: false });
    bsToast.show();
  });
}

onMounted(() => {
  initToasts();
});

watch(
  () => store.notifications,
  (notifications) => {
    notifications.forEach((n) => {
      if (!n._timeoutSet) {
        n._timeoutSet = true;
        //setTimeout(() => removeToast(n.task_id), 30000); // 5 minuto
      }
    });
  },
  { deep: true }
);
</script>

<style>
.toast-container .toast {
  min-width: 300px;
  margin-bottom: 0.5rem;
}
</style>
