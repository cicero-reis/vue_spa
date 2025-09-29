<template>
    <div class="d-flex justify-content-end mb-3">
        <button 
            type="button" 
            class="btn btn-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#taskModal"
        >
            + Add Task
        </button>
        <div 
            class="modal fade" 
            id="taskModal" 
            tabindex="-1" 
            aria-labelledby="taskModalLabel" 
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="taskModalLabel">Nova Task</h5>
                        <button 
                            type="button" 
                            class="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="Object.keys(store.errors).length" class="alert alert-danger">
                            <div v-for="(messages, field) in store.errors" :key="field">
                                <span v-for="msg in messages" :key="msg" class="d-block">{{ msg }}</span>
                            </div>
                        </div>
                        <input 
                            type="text"
                            v-model="newTask.name"
                            class="form-control mb-3"
                            placeholder="Nome da Task"
                        />
                        <select v-model="newTask.priority" class="form-select">
                            <option disabled value="">Select priority</option>
                            <option value="1">Low</option>
                            <option value="2">Normal</option>
                            <option value="3">High</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button 
                            type="button" 
                            class="btn btn-secondary" 
                            data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            @click="addNewTask">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'

const store = useTaskStore()
const { handleAddedTask } = store

const newTask = reactive({
  name: '',
  priority: ''
})

const addNewTask = async () => {
  const success = await handleAddedTask({ ...newTask })

  if (success) {

    newTask.name = ''
    newTask.priority = ''

    const modalEl = document.getElementById('taskModal')
    modalEl.querySelector(':focus')?.blur()

    const modal = bootstrap.Modal.getInstance(modalEl)
    modal.hide()
  }
}

onMounted(() => {
  const modalEl = document.getElementById('taskModal')
  
  modalEl.addEventListener('shown.bs.modal', () => {
    store.errors = {}
    newTask.name = ''
    newTask.priority = ''
  })
  
  modalEl.addEventListener('hidden.bs.modal', () => {
    store.errors = {}
    newTask.name = ''
    newTask.priority = ''
  })
})
</script>
