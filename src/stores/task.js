import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { listTasks, findTask, createTask, updateTask, updateIsCompleteTask, updateUserIdTask, deleteTask } from '@/http/task-api'

export const useTaskStore = defineStore('taskStore', () => {

    const tasks = ref([])
    const task = ref()
    const meta = ref({})
    const errors = ref([])

    const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))
    const unCompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))

    const handleListTask = async (page = 1) => {
        try {
            const { data } = await listTasks(page)
            tasks.value = data.data
            meta.value = data.meta
        } catch (error) {
            errors.value = error
        }
    }

    const handleFindTask = async (task) => {
        try {
            const { data } = await findTask(task.id)
            task.value = data
        } catch (error) {
            errors.value = error
        }
    }

    const handleAddedTask = async (newTask) => {
        try {
            const { data: createdTask } = await createTask(newTask)
            tasks.value.unshift(createdTask)
        } catch (error) {
            errors.value = error
        }
    }

    const handleUpdatedTask = async (task) => {
        try {
            const { data: updatedTask } = await updateTask(task.id, task)
            const currentTask = tasks.value.find(item => item.id === task.id)
            currentTask.name = updatedTask.name
        } catch (error) {
            errors.value = error
        }
    }

    const handleCompletedTask = async (task) => {
        try {
            const isCompleted = task.is_completed ? 1 : 0
            await updateIsCompleteTask(task.id, { is_completed: isCompleted })
            const { data } = await listTasks()
            tasks.value = data.data
        } catch (error) {
            errors.value = error
        }
    }

    const handledAssignTask = async (taskId, userId) => {
        try {
            await updateUserIdTask(taskId, { user_id: userId })
            const { data } = await listTasks()
            tasks.value = data.data
        } catch (error) {
            errors.value = error
        }
    }

    const handleRemovedTask = async (task) => {
        try {
            await deleteTask(task.id)
            const index = tasks.value.findIndex((item) => item.id === task.id)
            tasks.value.splice(index, 1)
        } catch (error) {
            errors.value = error
        }
    }

    return {
        tasks,
        meta,
        errors,
        completedTasks,
        unCompletedTasks,
        handleListTask,
        handleFindTask,
        handleAddedTask,
        handleUpdatedTask,
        handleCompletedTask,
        handledAssignTask,
        handleRemovedTask
    }
})