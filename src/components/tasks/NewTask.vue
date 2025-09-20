<template>
    <div v-if="Object.keys(store.errors).length" class="alert alert-danger">
        <div v-for="(messages, field) in store.errors" :key="field">
            <span v-for="msg in messages" :key="msg" class="d-block">{{ msg }}</span>
        </div>
    </div>
    <div class="relative">
        <input type="text" 
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save." 
            @keydown.enter="addNewTask"
        />
    </div>
</template>

<script setup>
import {  reactive } from 'vue'
import { useTaskStore } from '@/stores/task'

const store = useTaskStore()

const { handleAddedTask } = store

const newTask = reactive({
    name: '',
    user_id: 1
})

const addNewTask = async (event) => {
    newTask.name = event.target.value
    newTask.user_id = event.target.value
    event.target.value = ""
    await handleAddedTask(newTask)
}
</script>