import { defineStore } from "pinia";
import { ref } from "vue";
import { taskSummary, feedback } from "@/http/user-api";

export const userStore = defineStore('userStore', () => {

    const taskSummaryObject = ref({})
    const feedbackObject = ref({})
    const errors = ref([])

    const handleTaskSumary = async (userId) => {
        try {
            const result = await taskSummary(userId)            
            taskSummaryObject.value = result.data
            console.log(taskSummaryObject.value)
        } catch (error) {
            errors.value = error
        }
    }

    const handleFeedBack = async (tasks) => {
        try {
            const result = await feedback(tasks)
            feedbackObject.value = result.data
            console.log(feedbackObject.value)
        } catch (error)  {
            errors.value = error
        }
    }

    return {
        taskSummaryObject,
        feedbackObject,
        errors,
        handleTaskSumary,
        handleFeedBack
    }
})