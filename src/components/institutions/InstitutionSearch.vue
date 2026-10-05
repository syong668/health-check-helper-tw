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
  <div class="search-panel rounded-2xl border border-border bg-card p-4 shadow-sm shadow-brand-deep/5 sm:p-5">
    <div class="grid items-end gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)_auto]">
      <label class="group block min-w-0">
        <span class="mb-2 block text-sm text-foreground">搜尋醫療機構</span>
        <span class="relative block">
          <Search class="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" aria-hidden="true" />
          <Input
            v-model="keyword"
            type="search"
            placeholder="輸入醫院名稱、區域或健檢類別"
            class="h-13 rounded-xl border-input bg-background pl-12 pr-4 text-base shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          />
        </span>
      </label>

      <label class="block min-w-0">
        <span class="mb-2 block text-sm text-foreground">縣市篩選</span>
        <span class="relative block">
          <SlidersHorizontal class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <select
            v-model="city"
            class="h-13 w-full appearance-none rounded-xl border border-input bg-background pl-11 pr-10 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card"
          >
            <option value="">全台縣市</option>
            <option v-for="item in cities" :key="item" :value="item">{{ item }}</option>
          </select>
          <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">▼</span>
        </span>
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
      <p v-else class="flex min-h-6 items-center text-sm text-muted-foreground lg:min-h-13 lg:min-w-28 lg:justify-end lg:pl-2">
        {{ isLoading ? '資料讀取中…' : `共 ${resultCount} 間院所` }}
      </p>
    </div>
  </div>
</template>
