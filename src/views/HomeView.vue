<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { AlertCircle, ArrowDown, Database, RefreshCw, SearchX, ShieldCheck } from '@lucide/vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import clinicVisit from '@/assets/illustrations/clinic-visit.png'
import InstitutionCard from '@/components/institutions/InstitutionCard.vue'
import InstitutionCardSkeleton from '@/components/institutions/InstitutionCardSkeleton.vue'
import InstitutionSearch from '@/components/institutions/InstitutionSearch.vue'
import { Button } from '@/components/ui/button'
import { useInstitutionFilters } from '@/composables/useInstitutionFilters'
import { useInstitutionStore } from '@/stores/institutions'

const PAGE_SIZE = 6
const COUNT_UP_DURATION = 1000

const store = useInstitutionStore()
const { institutions, cities, isLoading, errorMessage, apiUpdateTime } = storeToRefs(store)
const {
  keyword, selectedCity, selectedDistricts, selectedCategories,
  districts, categoryOptions, filteredInstitutions, hasFilters, resetFilters,
} = useInstitutionFilters(institutions)
const visibleCount = ref(PAGE_SIZE)
const queryMode = ref('district')
const preferredReducedMotion = usePreferredReducedMotion()
const statisticsReady = ref(false)
const displayedInstitutionCount = ref(0)
const displayedCityCount = ref(0)
let hasPlayedCountUp = false
let countUpFrame: number | undefined

const visibleInstitutions = computed(() => filteredInstitutions.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filteredInstitutions.value.length)
const formattedUpdateTime = computed(() => {
  const matched = apiUpdateTime.value.match(/^(\d{4})(\d{2})(\d{2})/)
  return matched ? `${matched[1]}.${matched[2]}.${matched[3]}` : '—'
})

function handleReset() {
  resetFilters()
  visibleCount.value = PAGE_SIZE
}

function showMore() {
  visibleCount.value += PAGE_SIZE
}

function cancelCountUp() {
  if (countUpFrame !== undefined) {
    cancelAnimationFrame(countUpFrame)
    countUpFrame = undefined
  }
}

function showFinalCounts() {
  displayedInstitutionCount.value = institutions.value.length
  displayedCityCount.value = cities.value.length
}

function startCountUp() {
  const institutionTarget = institutions.value.length
  const cityTarget = cities.value.length
  let startedAt: number | undefined

  displayedInstitutionCount.value = 0
  displayedCityCount.value = 0

  // Two counts share the same clock, so they finish together regardless of size.
  function updateCounts(timestamp: number) {
    startedAt ??= timestamp
    const progress = Math.min((timestamp - startedAt) / COUNT_UP_DURATION, 1)
    const easedProgress = 1 - (1 - progress) ** 3

    displayedInstitutionCount.value = Math.floor(institutionTarget * easedProgress)
    displayedCityCount.value = Math.floor(cityTarget * easedProgress)

    if (progress < 1) {
      countUpFrame = requestAnimationFrame(updateCounts)
    } else {
      countUpFrame = undefined
      showFinalCounts()
    }
  }

  countUpFrame = requestAnimationFrame(updateCounts)
}

watch(isLoading, (loading) => {
  cancelCountUp()
  statisticsReady.value = !loading && !errorMessage.value

  if (!statisticsReady.value) return

  if (hasPlayedCountUp || preferredReducedMotion.value === 'reduce') {
    showFinalCounts()
  } else if (institutions.value.length || cities.value.length) {
    startCountUp()
  } else {
    showFinalCounts()
  }

  hasPlayedCountUp = true
})

watch(preferredReducedMotion, (preference) => {
  if (preference === 'reduce') {
    cancelCountUp()
    if (statisticsReady.value) showFinalCounts()
  }
}, { flush: 'sync' })

watch([keyword, selectedCity, selectedDistricts, selectedCategories], () => {
  visibleCount.value = PAGE_SIZE
}, { deep: true })

onMounted(store.loadInstitutions)
onBeforeUnmount(cancelCountUp)
</script>

<template>
  <DefaultLayout>
    <section class="hero-section text-foreground">
      <div class="mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-8 sm:pb-18 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center lg:gap-12 lg:px-8 lg:pb-16 lg:pt-12 xl:grid-cols-[minmax(0,1fr)_32rem]">
        <div class="min-w-0 max-w-3xl">
          <p class="hero-source-badge mb-4 inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm">
            <ShieldCheck class="size-4 shrink-0" aria-hidden="true" />
            勞動部認可院所開放資料
          </p>
          <h1 class="max-w-3xl text-[2rem] leading-[1.35] tracking-normal text-balance sm:text-[2.75rem] lg:text-[2.75rem] xl:text-[3.25rem]">
            健檢去哪裡？<br />找到<span class="text-primary">認可的醫療機構</span>
          </h1>
          <p class="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            整合全台勞工體格及健康檢查認可院所，用縣市、院所或健檢類別快速篩選，讓你少繞點路。
          </p>
          <dl class="mt-5 grid w-full max-w-lg grid-cols-3 sm:mt-6">
            <div class="flex min-w-0 flex-col items-start gap-1 border-l py-1 pl-2 sm:pl-6">
              <dt class="order-2 text-xs leading-5 text-muted-foreground sm:text-sm">認可院所</dt>
              <dd class="order-1 text-2xl leading-8 tabular-nums text-foreground sm:text-3xl sm:leading-9">
                <span aria-hidden="true">{{ statisticsReady ? displayedInstitutionCount : '—' }}</span>
                <span class="sr-only">{{ statisticsReady ? institutions.length : '—' }}</span>
              </dd>
            </div>
            <div class="flex min-w-0 flex-col items-start gap-1 border-l py-1 pl-2 sm:pl-6">
              <dt class="order-2 text-xs leading-5 text-muted-foreground sm:text-sm">縣市覆蓋</dt>
              <dd class="order-1 text-2xl leading-8 tabular-nums text-foreground sm:text-3xl sm:leading-9">
                <span aria-hidden="true">{{ statisticsReady ? displayedCityCount : '—' }}</span>
                <span class="sr-only">{{ statisticsReady ? cities.length : '—' }}</span>
              </dd>
            </div>
            <div class="flex min-w-0 flex-col items-start gap-1 border-l py-1 pl-2 sm:pl-6">
              <dt class="order-2 text-xs leading-5 text-muted-foreground sm:text-sm">資料更新</dt>
              <dd class="order-1 text-sm leading-8 whitespace-nowrap tabular-nums text-foreground sm:text-xl sm:leading-9">{{ isLoading ? '—' : formattedUpdateTime }}</dd>
            </div>
          </dl>
        </div>

        <!-- lg（1024px）以上顯示插圖並切換雙欄。 -->
        <div class="hero-illustration relative hidden place-items-center lg:grid lg:h-96 xl:h-128" aria-hidden="true">
          <img
            :src="clinicVisit"
            alt=""
            width="1254"
            height="1254"
            fetchpriority="high"
            decoding="async"
            class="w-auto max-w-full object-contain lg:h-96 xl:h-128"
          />
        </div>
      </div>
    </section>

    <section id="search" class="relative z-10 mx-auto -mt-8 max-w-7xl scroll-mt-6 px-5 lg:px-8">
      <InstitutionSearch
        v-model:query-mode="queryMode"
        v-model:keyword="keyword"
        v-model:city="selectedCity"
        v-model:selected-districts="selectedDistricts"
        v-model:categories="selectedCategories"
        :cities="cities"
        :districts="districts"
        :category-options="categoryOptions"
        :has-filters="hasFilters"
        :error-message="errorMessage"
        :result-count="filteredInstitutions.length"
        :is-loading="isLoading"
        @reset="handleReset"
      />
    </section>

    <section v-show="queryMode === 'district'" class="mx-auto min-h-[38rem] max-w-7xl px-5 pb-24 pt-10 lg:px-8 lg:pt-14">
      <div class="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-bold text-primary">搜尋結果</p>
          <h2 class="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
            <template v-if="isLoading">正在整理院所資料</template>
            <template v-else-if="errorMessage">資料載入失敗</template>
            <template v-else>找到 {{ filteredInstitutions.length }} 間醫療機構</template>
          </h2>
        </div>
        <p v-if="!isLoading && !errorMessage" class="flex items-center gap-2 text-sm text-muted-foreground">
          <Database class="size-4" aria-hidden="true" />
          資料來源：勞動部職業安全衛生署
        </p>
      </div>

      <div v-if="isLoading" class="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-live="polite" aria-label="正在載入醫療機構">
        <InstitutionCardSkeleton v-for="item in 6" :key="item" />
      </div>

      <div v-else-if="errorMessage" class="rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-14 text-center">
        <span class="mx-auto grid size-13 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle class="size-6" aria-hidden="true" />
        </span>
        <h3 class="mt-5 text-xl font-bold">暫時無法取得官方資料</h3>
        <p class="mx-auto mt-2 max-w-lg leading-7 text-muted-foreground">
          {{ errorMessage }}。可能是網路、跨網域限制或官方 API 維護中，請稍後重試。
        </p>
        <Button class="mt-6 rounded-lg" @click="store.loadInstitutions">
          <RefreshCw aria-hidden="true" />
          重新載入
        </Button>
      </div>

      <div v-else-if="visibleInstitutions.length" class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <InstitutionCard
          v-for="institution in visibleInstitutions"
          :key="institution.id"
          :institution="institution"
        />
      </div>

      <div v-else class="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <span class="mx-auto grid size-13 place-items-center rounded-full bg-secondary text-primary">
          <SearchX class="size-6" aria-hidden="true" />
        </span>
        <h3 class="mt-5 text-xl font-bold">沒有找到符合的院所</h3>
        <p class="mt-2 text-muted-foreground">試著調整關鍵字、縣市、鄉鎮市區，或減少勾選的健檢類別。</p>
        <Button v-if="hasFilters" variant="outline" class="mt-6 rounded-lg" @click="handleReset">
          清除所有條件
        </Button>
      </div>

      <div v-if="hasMore && !isLoading" class="mt-10 text-center">
        <Button variant="outline" size="lg" class="rounded-full px-7" @click="showMore">
          顯示更多
          <ArrowDown aria-hidden="true" />
        </Button>
        <p class="mt-3 text-xs text-muted-foreground">
          已顯示 {{ visibleInstitutions.length }} / {{ filteredInstitutions.length }} 間
        </p>
      </div>
    </section>
  </DefaultLayout>
</template>
