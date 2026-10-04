<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { AlertCircle, ArrowDown, Database, RefreshCw, SearchX, ShieldCheck } from '@lucide/vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import InstitutionCard from '@/components/institutions/InstitutionCard.vue'
import InstitutionCardSkeleton from '@/components/institutions/InstitutionCardSkeleton.vue'
import InstitutionSearch from '@/components/institutions/InstitutionSearch.vue'
import { Button } from '@/components/ui/button'
import { useInstitutionFilters } from '@/composables/useInstitutionFilters'
import { useInstitutionStore } from '@/stores/institutions'

const PAGE_SIZE = 6

const store = useInstitutionStore()
const { institutions, cities, isLoading, errorMessage, apiUpdateTime } = storeToRefs(store)
const { keyword, selectedCity, filteredInstitutions, hasFilters, resetFilters } =
  useInstitutionFilters(institutions)
const visibleCount = ref(PAGE_SIZE)

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

watch([keyword, selectedCity], () => {
  visibleCount.value = PAGE_SIZE
})

onMounted(store.loadInstitutions)
</script>

<template>
  <DefaultLayout>
    <section class="hero-section bg-foreground text-white">
      <div class="mx-auto grid max-w-7xl gap-8 px-5 pb-18 pt-11 sm:pb-20 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16 lg:px-8 lg:pb-22 lg:pt-16">
        <div class="max-w-3xl">
          <p class="mb-5 inline-flex items-center gap-2 border-l-2 border-accent pl-3 text-sm font-semibold tracking-wide text-accent">
            <ShieldCheck class="size-4" aria-hidden="true" />
            勞動部認可院所開放資料
          </p>
          <h1 class="max-w-3xl text-4xl font-black leading-[1.12] tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.5rem]">
            健檢去哪裡？<br />找到<span class="text-accent">認可的醫療機構</span>
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:mt-5 sm:text-lg sm:leading-8">
            整合全台勞工體格及健康檢查認可院所，用縣市、院所或健檢類別快速篩選，讓你少繞點路。
          </p>
        </div>

        <div class="grid grid-cols-3 border-y border-white/15 py-5 lg:grid-cols-1 lg:gap-4 lg:border-y-0 lg:border-l lg:py-0 lg:pl-8">
          <div>
            <p class="text-2xl font-black tabular-nums sm:text-3xl lg:text-2xl">{{ isLoading ? '—' : institutions.length }}</p>
            <p class="mt-1 text-xs text-white/55 sm:text-sm">認可院所</p>
          </div>
          <div class="border-l border-white/15 pl-4 sm:pl-6 lg:border-l-0 lg:pl-0">
            <p class="text-2xl font-black tabular-nums sm:text-3xl lg:text-2xl">{{ isLoading ? '—' : cities.length }}</p>
            <p class="mt-1 text-xs text-white/55 sm:text-sm">縣市覆蓋</p>
          </div>
          <div class="border-l border-white/15 pl-4 sm:pl-6 lg:border-l-0 lg:pl-0">
            <p class="text-lg font-black tabular-nums sm:text-2xl lg:text-xl">{{ formattedUpdateTime }}</p>
            <p class="mt-1 text-xs text-white/55 sm:text-sm">資料更新</p>
          </div>
        </div>
      </div>
    </section>

    <section id="search" class="relative z-10 mx-auto -mt-8 max-w-7xl scroll-mt-6 px-5 lg:px-8">
      <InstitutionSearch
        v-model:keyword="keyword"
        v-model:city="selectedCity"
        :cities="cities"
        :result-count="filteredInstitutions.length"
        :is-loading="isLoading"
        @reset="handleReset"
      />
    </section>

    <section class="mx-auto min-h-[38rem] max-w-7xl px-5 pb-24 pt-10 lg:px-8 lg:pt-14">
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
        <p class="mt-2 text-muted-foreground">試著重新輸入關鍵字，或改選其他縣市。</p>
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
