<template>
    <main style="min-height: 50vh; margin-top: 2rem">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    
                    <NewTask />

                    <Tasks :tasks="unCompletedTasks" />

                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" @click="showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show completed</span>
                            <span v-else>Hide completed</span>
                        </button>
                    </div>

                    <Tasks :tasks="completedTasks" :show="completedTaskIsVisible && showCompletedTasks" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>

import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/task'
import Tasks from '@/components/tasks/Tasks.vue';
import NewTask from '@/components/tasks/NewTask.vue';

const store = useTaskStore()
const { completedTasks, unCompletedTasks } = storeToRefs(store)
const { fetchListTask } = store

onMounted(async () => {
    await fetchListTask()
})

const showToggleCompletedBtn = computed(
    () => unCompletedTasks.value.length > 0 && completedTasks.value.length > 0
)
const completedTaskIsVisible = computed(
    () => unCompletedTasks.value.length === 0 || completedTasks.value.length > 0
)
const showCompletedTasks = ref(false)

</script>