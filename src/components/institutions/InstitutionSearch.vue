<script setup lang="ts">
import { Search, SlidersHorizontal, X } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

defineProps<{
  cities: string[]
  resultCount: number
  isLoading: boolean
}>()

const keyword = defineModel<string>('keyword', { required: true })
const city = defineModel<string>('city', { required: true })

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="search-panel rounded-[1.35rem] border border-border/80 bg-card p-4 shadow-xl shadow-brand-deep/10 sm:p-5">
    <div class="grid gap-3 lg:grid-cols-[1.3fr_0.7fr_auto]">
      <label class="group relative block">
        <span class="sr-only">搜尋醫療機構</span>
        <Search class="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" aria-hidden="true" />
        <Input
          v-model="keyword"
          type="search"
          placeholder="輸入醫院名稱、區域或健檢類別"
          class="h-13 rounded-xl border-border/80 bg-secondary/25 pl-12 pr-4 text-base shadow-none"
        />
      </label>

      <label class="relative block">
        <span class="sr-only">縣市篩選</span>
        <SlidersHorizontal class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <select
          v-model="city"
          class="h-13 w-full appearance-none rounded-xl border border-border/80 bg-secondary/25 pl-11 pr-10 text-base font-medium text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-ring/20"
        >
          <option value="">全台縣市</option>
          <option v-for="item in cities" :key="item" :value="item">{{ item }}</option>
        </select>
        <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">▼</span>
      </label>

      <Button
        v-if="keyword || city"
        variant="outline"
        class="h-13 rounded-xl px-5"
        type="button"
        @click="emit('reset')"
      >
        <X aria-hidden="true" />
        清除條件
      </Button>
      <div v-else class="hidden min-w-28 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground lg:flex">
        {{ isLoading ? '讀取中' : `${resultCount} 間院所` }}
      </div>
    </div>
  </div>
</template>
