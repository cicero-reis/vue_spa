import { defineStore } from 'pinia';
import { ref } from 'vue';
import { taskSummary, feedback } from '@/http/user-api';

export const userStore = defineStore('userStore', () => {

    const taskSummaryObject = ref({})
    const feedbackObject = ref({})
    const errors = ref([])

    const taskPayload = () => {
        return {
            "user_id": taskSummaryObject.value.user_id,
            "user_name": taskSummaryObject.value.user_name,
            "task_summary": {
                "total": taskSummaryObject.value.task_summary.total,
                "on_time": taskSummaryObject.value.task_summary.on_time,
                "late": taskSummaryObject.value.task_summary.late,
                "pending": taskSummaryObject.value.task_summary.pending,
                "percent_on_time": taskSummaryObject.value.task_summary.percent_on_time
            }
        }
    }

        const handleTaskSumary = async (userId) => {
            try {
                const result = await taskSummary(userId)
                taskSummaryObject.value = result.data
            } catch (error) {
                errors.value = error
            }
        }

        const handleFeedBack = async (tasks) => {
            try {
                const result = await feedback(tasks)
                feedbackObject.value = result.data
            } catch (error) {
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