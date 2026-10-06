<script setup lang="ts">
import { ChevronDown, Search, SlidersHorizontal, X } from '@lucide/vue'
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { CustomMultiSelect } from '@/components/ui/custom-multi-select'
import { Input } from '@/components/ui/input'

defineProps<{
  cities: string[]
  districts: string[]
  categoryOptions: string[]
  hasFilters: boolean
  errorMessage: string
  resultCount: number
  isLoading: boolean
}>()

const keyword = defineModel<string>('keyword', { required: true })
const city = defineModel<string>('city', { required: true })
const selectedDistricts = defineModel<string[]>('selectedDistricts', { required: true })
const categories = defineModel<string[]>('categories', { required: true })
const queryMode = defineModel<string>('queryMode', { default: 'district' })

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <TabsRoot v-model="queryMode" class="search-panel rounded-2xl border border-border bg-card p-4 shadow-sm shadow-brand-deep/5 sm:p-5">
    <TabsList aria-label="院所查詢方式" class="mb-6 grid grid-cols-2 gap-2 sm:flex sm:gap-6">
      <TabsTrigger
        value="district"
        class="flex h-16 cursor-pointer items-center justify-center border-b-4 border-transparent px-3 text-base text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card data-[state=active]:border-primary data-[state=active]:text-primary sm:h-14 sm:px-4"
      >
        依行政區查詢
      </TabsTrigger>
      <TabsTrigger
        value="map"
        class="flex h-16 cursor-pointer items-center justify-center border-b-4 border-transparent px-3 text-base text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card data-[state=active]:border-primary data-[state=active]:text-primary sm:h-14 sm:px-4"
      >
        依地圖查詢
      </TabsTrigger>
    </TabsList>

    <TabsContent value="district" class="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card">
      <div class="grid items-end gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <label class="block min-w-0">
          <span class="mb-2 block text-sm text-foreground">縣市別</span>
          <span class="relative block">
            <SlidersHorizontal class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <select
              v-model="city"
              :disabled="isLoading || Boolean(errorMessage) || !cities.length"
              class="h-13 w-full appearance-none rounded-xl border border-input bg-background pl-11 pr-10 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              <option value="">全台縣市</option>
              <option v-for="item in cities" :key="item" :value="item">{{ item }}</option>
            </select>
            <ChevronDown class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          </span>
        </label>

        <CustomMultiSelect
          v-model="selectedDistricts"
          :options="districts"
          label="鄉鎮市區（可複選）"
          selection-unit="個行政區"
          :disabled="!city || isLoading || Boolean(errorMessage) || !districts.length"
          :placeholder="isLoading ? '資料讀取中…' : errorMessage ? '資料尚未載入' : !city ? '請先選擇縣市' : districts.length ? '全部鄉鎮市區' : '無可用行政區資料'"
        />

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
      </div>

      <fieldset :disabled="isLoading || Boolean(errorMessage) || !categoryOptions.length" class="mt-6 min-w-0">
        <legend class="text-sm text-foreground">健檢類別（可複選）</legend>
        <p class="mt-2 text-sm leading-6 text-muted-foreground">
          可複選，院所須提供全部勾選類別；未勾選時不限類別。
        </p>
        <p v-if="isLoading" class="mt-3 text-sm text-muted-foreground">正在讀取健檢類別…</p>
        <p v-else-if="errorMessage" class="mt-3 text-sm text-muted-foreground">資料載入失敗，暫時無法選擇健檢類別。</p>
        <p v-else-if="!categoryOptions.length" class="mt-3 text-sm text-muted-foreground">目前沒有可用的健檢類別資料。</p>
        <div v-else class="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          <label v-for="category in categoryOptions" :key="category" class="flex min-h-11 min-w-0 cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-base text-foreground transition-colors hover:bg-secondary/50 focus-within:bg-secondary/50">
            <input
              v-model="categories"
              type="checkbox"
              :value="category"
              class="size-4 shrink-0 cursor-pointer accent-primary outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            />
            <span class="leading-6">{{ category }}</span>
          </label>
        </div>
      </fieldset>

      <div class="mt-5 flex flex-wrap items-center justify-between gap-3">
        <!-- <p class="text-sm text-muted-foreground" role="status" aria-atomic="true">
          {{ isLoading ? '資料讀取中…' : errorMessage ? '資料尚未載入' : `共 ${resultCount} 間院所` }}
        </p> -->
        <Button
          v-if="hasFilters"
          variant="outline"
          class="min-h-11 rounded-xl px-5 ms-auto"
          type="button"
          @click="emit('reset')"
        >
          <X aria-hidden="true" />
          清除條件
        </Button>
      </div>
    </TabsContent>
    <!-- 地圖功能暫不實作，先保留可切換的內容區。 -->
    <TabsContent value="map" class="min-h-24 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card" />
  </TabsRoot>
</template>
