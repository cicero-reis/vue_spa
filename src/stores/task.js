import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { listTasks, createTask, updateTask, updateIsCompleteTask, deleteTask } from '@/http/task-api'

export const useTaskStore = defineStore('taskStore', () => {

    const tasks = ref([])

    const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))
    const unCompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed))

    const fetchListTask = async () => {
        const { data } = await listTasks()
        tasks.value = data.data
    }

    const handleAddedTask = async (newTask) => {
        const { data: createdTask } = await createTask(newTask)
        tasks.value.unshift(createdTask)
    }

    const handleUpdatedTask = async (task) => {
        const { data: updatedTask } = await updateTask(task.id, task)
        const currentTask = tasks.value.find(item => item.id === task.id)
        currentTask.name = updatedTask.name
    }

    const handleCompletedTask = async (task) => {
        const isCompleted = task.is_completed ? 1 : 0
        const { data: updateIsCompletedTask } = await updateIsCompleteTask(task.id, {
            is_completed: isCompleted
        })
        const currentTask = tasks.value.find(item => item.id === task.id)
        currentTask.is_completed = updateIsCompletedTask.is_completed
    }

    const handleRemovedTask = async (task) => {
        await deleteTask(task.id)
        const index = tasks.value.findIndex((item) => item.id === task.id)
        tasks.value.splice(index, 1)
    }

    return {
        tasks, 
        completedTasks, 
        unCompletedTasks, 
        fetchListTask, 
        handleAddedTask,
        handleUpdatedTask,
        handleCompletedTask,
        handleRemovedTask
    }
})