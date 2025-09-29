<template>
  <li class="list-group-item py-3">
    <div class="d-flex justify-content-start align-items-start">
      <img v-if="task.user" class="rounded-circle me-2" width="40" height="40" :src="task.user?.profile"
           :alt="task.user?.name">
      <div class="flex-grow-1 text-break" style="min-width: 0;" :class="completedClass"
           title="Double click the text to edit or remove" @dblclick="isEdit = true">
        <div class="relative" v-if="isEdit">
          <input class="editable-task w-100" type="text" v-focus @keyup.esc="undo" @keyup.enter="updateTask"
                 v-model="editingTask" />
        </div>
        <span v-else>
          {{ task.name }}
        </span>
        <div class="d-flex flex-column text-start mt-1">
          <div class="task-delivery-status text-muted">
            <span v-if="task.priority">
              Priority: <strong :style="{ color: task.delivery_status?.color || '#000' }">
                {{ task.priority }}
              </strong>
            </span>
          </div>
          <div class="task-delivery-status text-muted">
            <span v-if="task.delivery_status?.value">
              Delivery: <strong :style="{ color: task.delivery_status.color }">
                {{ task.delivery_status.value }}
              </strong>
            </span>
          </div>
          <div class="task-delivery-status text-muted">
            <a href="#" class="text-decoration-none" @click.prevent="markTaskAsCompleted(task.id)">Finish</a>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column text-end ms-2" style="min-width: 120px;">
        <div class="task-user text-muted">
          <span v-if="task.user?.name">
            Assignee: {{ task.user.name }}
          </span>
          <a v-else href="#" class="text-decoration-none" @click.prevent="assignTask(task.id)">Not Assigned</a>
        </div>
        <div class="task-date">Due: {{ task.due_date }}</div>
        <div class="task-date">Created: {{ task.created_at }}</div>
        <div class="task-date">Updated: {{ task.updated_at }}</div>
      </div>
    </div>
    <TaskActions @edit="isEdit = true" v-show="!isEdit" @remove="removeTask" />
  </li>
</template>


<script setup>
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/task';
import { useAuthStore } from '@/stores/auth';
import TaskActions from '@/components/tasks/TaskActions.vue'


const store = useTaskStore()
const { handledAssignTask } = store

const authStore = useAuthStore()

const props = defineProps({
    task: Object
})

const emit = defineEmits(['updated', 'completed', 'removed'])

const isEdit = ref(false)
const editingTask = ref(props.task.name)

const completedClass = computed(() => props.task.is_completed ? 'completed' : '')

const vFocus = {
    mounted: (el) => el.focus()
}

const updateTask = event => {
    const updateTask = { ...props.task, name: event.target.value }
    isEdit.value = false
    emit('updated', updateTask)
}

const undo = () => {
    isEdit.value = false
    editingTask.value = props.task.name
}

const markTaskAsCompleted = event => {
    const updateTaskIsCompletd = { ...props.task, is_completed: !props.task.is_completed }
    emit('completed', updateTaskIsCompletd)
}

const removeTask = () => {
    if (confirm("Are you sure")) {
        emit('removed', props.task)
    }
}

const assignTask = async (taskId) => {
    await handledAssignTask(taskId, authStore.user.id)
}

</script>

<style scoped>
.task-user,
.task-delivery-status {
    font-size: 0.85rem;
}
</style>