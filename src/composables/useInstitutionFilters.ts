import { computed, ref, type Ref } from 'vue'
import type { MedicalInstitution } from '@/types/institution'

export function useInstitutionFilters(institutions: Ref<MedicalInstitution[]>) {
  const keyword = ref('')
  const selectedCity = ref('')

  const filteredInstitutions = computed(() => {
    const normalizedKeyword = keyword.value.trim().toLocaleLowerCase('zh-Hant')

    return institutions.value.filter((institution) => {
      const matchesCity = !selectedCity.value || institution.city === selectedCity.value
      const searchableText = [
        institution.name,
        institution.address,
        institution.city,
        institution.categories.join(' '),
      ]
        .join(' ')
        .toLocaleLowerCase('zh-Hant')

      return matchesCity && (!normalizedKeyword || searchableText.includes(normalizedKeyword))
    })
  })

  const hasFilters = computed(() => Boolean(keyword.value.trim() || selectedCity.value))

  function resetFilters() {
    keyword.value = ''
    selectedCity.value = ''
  }

  return {
    keyword,
    selectedCity,
    filteredInstitutions,
    hasFilters,
    resetFilters,
  }
}
