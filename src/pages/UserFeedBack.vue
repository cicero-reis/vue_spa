<template>
  <div class="container my-5">
    <!-- Botões principais -->
    <div class="d-flex justify-content-center gap-3 mb-4">
      <button class="btn btn-primary btn-lg" @click.prevent="taskSumary">
        Task Summary
      </button>
      <button class="btn btn-outline-secondary btn-lg" @click.prevent="myFeedBack">
        My Feedback
      </button>
    </div>

    <!-- Resumo das Tarefas -->
    <div v-if="taskSummary?.task_summary" class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Resumo das Tarefas - {{ taskSummary.user_name }}</h5>
      </div>
      <div class="card-body">
        <div class="row text-center">
          <div class="col-md-2 col-6 mb-3">
            <div class="card border-info h-100">
              <div class="card-body">
                <h6 class="card-title">Total</h6>
                <p class="card-text display-6">{{ taskSummary.task_summary.total }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-2 col-6 mb-3">
            <div class="card border-success h-100">
              <div class="card-body">
                <h6 class="card-title">No Prazo</h6>
                <p class="card-text display-6">{{ taskSummary.task_summary.on_time }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-2 col-6 mb-3">
            <div class="card border-danger h-100">
              <div class="card-body">
                <h6 class="card-title">Atrasadas</h6>
                <p class="card-text display-6">{{ taskSummary.task_summary.late }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-2 col-6 mb-3">
            <div class="card border-warning h-100">
              <div class="card-body">
                <h6 class="card-title">Pendentes</h6>
                <p class="card-text display-6">{{ taskSummary.task_summary.pending }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-12 mb-3">
            <div class="card border-success h-100">
              <div class="card-body">
                <h6 class="card-title">Percentual no Prazo</h6>
                <div class="progress" style="height: 25px;">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    :style="{ width: taskSummary.task_summary.percent_on_time + '%' }"
                    :aria-valuenow="taskSummary.task_summary.percent_on_time"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {{ taskSummary.task_summary.percent_on_time }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>

    <!-- Feedback -->
    <div v-if="summaryText" class="alert alert-info mt-4" role="alert">
      {{ summaryText }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { userStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

const storeUser = userStore()
const storeAuth = useAuthStore()

const { taskSummaryObject, feedbackObject } = storeToRefs(storeUser)
const { handleTaskSumary, handleFeedBack } = storeUser

const summaryText = computed(() => feedbackObject.value?.summary ?? '')
const taskSummary = computed(() => taskSummaryObject?.value ?? '')

const taskSumary = async () => {
    await handleTaskSumary(storeAuth.user.id)
}

const myFeedBack = async () => {
    const payload = {
        "user_id": taskSummary.value.user_id,
        "user_name": taskSummary.value.user_name,
        "task_summary": {
            "total": taskSummary.value.task_summary.total,
            "on_time": taskSummary.value.task_summary.on_time,
            "late": taskSummary.value.task_summary.late,
            "pending": taskSummary.value.task_summary.pending,
            "percent_on_time": taskSummary.value.task_summary.percent_on_time
        }
    }
    await handleFeedBack(payload)
}
</script>
