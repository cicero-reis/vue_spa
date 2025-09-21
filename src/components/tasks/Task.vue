<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input class="form-check-input mt-0" :class="completedClass" type="checkbox" :checked="task.is_completed"
                @change="markTaskAsCompleted" />
            <div class="ms-2 flex-grow-1" :class="completedClass" handleRemovedTask
                title="Double click the text to edit or remove" @dblclick="isEdit = true">
                <div class="relative" v-if="isEdit">
                    <input class="editable-task" type="text" v-focus @keyup.esc="undo" @keyup.enter="updateTask"
                        v-model="editingTask" />
                </div>
                <span v-else>
                    {{ task.name }}
                </span>
                <div class="d-flex flex-column text-start">
                    <div class="task-delivery-status text-muted">
                        <span v-if="task.delivery_status && task.delivery_status.value">
                            Delivery: <strong :style="{ color: task.delivery_status.color }">{{ task.delivery_status.value }}</strong>
                        </span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column text-end">
                <div class="task-user text-muted">
                    <span v-if="task.user && task.user.name">
                        Assignee: {{ task.user.name }}
                    </span>
                    <a v-else href="#" class="text-decoration-none" @click.prevent="assignTask(task.id)">Not Assigned</a>
                </div>
                <div class="task-date">created: {{ task.created_at }}</div>
                <div class="task-date">updated: {{ task.updated_at }}</div>

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