import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { HealthConcern } from '@/types/health'

export const useHealthCheckStore = defineStore('healthCheck', () => {
  const currentStep = ref(1)
  const concerns = ref<HealthConcern[]>([])

  function reset() {
    currentStep.value = 1
    concerns.value = []
  }

  return { currentStep, concerns, reset }
})
