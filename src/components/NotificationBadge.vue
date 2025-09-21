<template>
  <div>
    <span class="badge">{{ count }}</span>
     <ul>
      <li v-for="n in store.notifications" :key="n.task_id" :style="{color: n.color}">
        {{ n.title }} - {{ n.body }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useNotificationStore } from "@/stores/notifications";

const store = useNotificationStore();

const count = computed(() => store.notifications.length);

console.log('STORE:: ', store.notifications)
</script>

<style>
.badge {
  background-color: red;
  color: white;
  padding: 0.25em 0.5em;
  border-radius: 50%;
  font-weight: bold;
}
</style>
