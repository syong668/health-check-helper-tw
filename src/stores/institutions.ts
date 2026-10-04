import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchMedicalInstitutions } from '@/services/institutionService'
import type { MedicalInstitution } from '@/types/institution'

export const useInstitutionStore = defineStore('institutions', () => {
  const institutions = ref<MedicalInstitution[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const apiUpdateTime = ref('')

  const cities = computed(() =>
    [...new Set(institutions.value.map((item) => item.city))].sort((a, b) =>
      a.localeCompare(b, 'zh-Hant'),
    ),
  )

  async function loadInstitutions() {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const data = await fetchMedicalInstitutions()
      institutions.value = data.institutions
      apiUpdateTime.value = data.updateTime
    } catch (error) {
      institutions.value = []
      errorMessage.value = error instanceof Error ? error.message : '無法讀取醫療機構資料'
    } finally {
      isLoading.value = false
    }
  }

  return {
    institutions,
    isLoading,
    errorMessage,
    apiUpdateTime,
    cities,
    loadInstitutions,
  }
})
