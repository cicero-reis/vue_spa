<template>
    <div v-if="Object.keys(store.errors).length" class="alert alert-danger">
        <div v-for="(messages, field) in store.errors" :key="field">
            <span v-for="msg in messages" :key="msg" class="d-block">{{ msg }}</span>
        </div>
    </div>

    <div class="relative">
        <!-- Campo da task -->
        <input 
            type="text"
            v-model="newTask.name"
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task"
        />

        <!-- Campo priority -->
        <select v-model="newTask.priority" class="form-select mt-2">
            <option disabled value="">Select priority</option>
            <option value="1">Low</option>
            <option value="2">Normal</option>
            <option value="3">High</option>
        </select>

        <!-- Botão de salvar -->
        <button class="btn btn-primary mt-2" @click="addNewTask">
            Salvar
        </button>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useTaskStore } from '@/stores/task'

const store = useTaskStore()
const { handleAddedTask } = store

const newTask = reactive({
    name: '',
    priority: ''
})

const addNewTask = async () => {

    await handleAddedTask({ ...newTask })
    
    newTask.name = ''
    newTask.priority = ''
}
</script>
