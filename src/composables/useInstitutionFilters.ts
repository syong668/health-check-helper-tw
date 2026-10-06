import { computed, ref, watch, type Ref } from 'vue'
import type { MedicalInstitution } from '@/types/institution'

export function useInstitutionFilters(institutions: Ref<MedicalInstitution[]>) {
  const keyword = ref('')
  const selectedCity = ref('')
  const selectedDistricts = ref<string[]>([])
  const selectedCategories = ref<string[]>([])

  const districts = computed(() => {
    if (!selectedCity.value) return []

    return [...new Set(institutions.value
      .filter((institution) => institution.city === selectedCity.value)
      .map((institution) => institution.district)
      .filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, 'zh-Hant'))
  })

  // 選項取自完整資料，不隨其他篩選條件縮減。
  const categoryOptions = computed(() =>
    [...new Set(institutions.value.flatMap((institution) => institution.categories))],
  )

  watch(selectedCity, () => {
    selectedDistricts.value = []
  }, { flush: 'sync' })

  const filteredInstitutions = computed(() => {
    const normalizedKeyword = keyword.value.trim().toLocaleLowerCase('zh-Hant')

    return institutions.value.filter((institution) => {
      const matchesCity = !selectedCity.value || institution.city === selectedCity.value
      const matchesDistrict = !selectedDistricts.value.length || selectedDistricts.value.includes(institution.district)
      const matchesCategories = selectedCategories.value.every((category) =>
        institution.categories.includes(category),
      )
      const searchableText = [
        institution.name,
        institution.address,
        institution.city,
        institution.categories.join(' '),
      ]
        .join(' ')
        .toLocaleLowerCase('zh-Hant')

      return matchesCity && matchesDistrict && matchesCategories &&
        (!normalizedKeyword || searchableText.includes(normalizedKeyword))
    })
  })

  const hasFilters = computed(() => Boolean(
    keyword.value.trim() || selectedCity.value || selectedDistricts.value.length || selectedCategories.value.length,
  ))

  function resetFilters() {
    keyword.value = ''
    selectedCity.value = ''
    selectedDistricts.value = []
    selectedCategories.value = []
  }

  return {
    keyword,
    selectedCity,
    selectedDistricts,
    selectedCategories,
    districts,
    categoryOptions,
    filteredInstitutions,
    hasFilters,
    resetFilters,
  }
}
