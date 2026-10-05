<script setup lang="ts">
import { Building2, CalendarDays, MapPinned } from '@lucide/vue'

defineProps<{
  institutionCount: number
  cityCount: number
  updateTime: string
  isLoading: boolean
}>()
</script>

<template>
  <aside
    class="relative hidden min-h-[19rem] overflow-hidden rounded-3xl bg-white/[0.035] lg:block"
    aria-labelledby="coverage-title"
  >
    <div class="absolute inset-x-5 top-5 z-10 flex items-center justify-between">
      <p id="coverage-title" class="text-xs font-bold tracking-[0.14em] text-white/65">
        全台院所覆蓋
      </p>
      <span class="inline-flex items-center gap-2 text-xs font-medium text-accent">
        <span class="size-1.5 rounded-full bg-accent" aria-hidden="true"></span>
        官方資料
      </span>
    </div>

    <div class="grid min-h-[19rem] grid-cols-[minmax(0,1fr)_9.5rem] grid-rows-[1fr_1fr_auto] gap-3 p-5 pt-13">
      <div class="relative row-span-3 grid min-w-0 place-items-center" aria-hidden="true">
        <!-- 海岸線來自內政部界線資料轉製的 Taiwan Atlas，並針對 Hero 尺寸簡化。 -->
        <svg class="h-[15.5rem] w-full max-w-[14.25rem] overflow-visible" viewBox="8 18 190 286">
          <path
            class="fill-accent/10"
            d="M181.9 53.5 176.1 57 171.4 64.3 172.5 78.5 175.8 82.8 174.8 88.1 172.3 89.6 174 91.9 169.5 95.5 167.2 105.3 159 113.9 159 118.5 155.6 121.9 157.8 128.1 154.8 131.8 144 180.7 138.8 189.7 139 195.1 140.9 195.8 136.2 198.2 129.1 212.2 123.2 216.9 123.9 221.1 122.1 223.9 111.4 230.9 107 239.6 100.7 256.4 101.2 279.5 96.7 285.3 98.6 289.6 90.9 285.1 88 288.2 84.9 280.1 87.2 274 81.1 258 76 252.8 54.8 240.3 57.3 241.6 52.4 234.7 52.8 228.3 49.3 220.4 47.4 219.7 48.7 219 45.7 208.7 35 200.2 42.9 175.9 45.4 175.3 44.5 170.5 43.1 170.8 45.8 167.7 42 167.4 44.3 164.7 43.4 156.8 41.6 156.8 45.5 148.6 44.8 145.3 52.3 136.9 65.1 114.8 83.4 91.8 87.2 82.8 97.8 75 101 70.2 102.1 63.4 112.6 48.9 126.9 42.8 138 41 143 32.8 147.4 29.8 152.5 29.3 155.9 31.2 158.9 36.3 161.8 35.5 160.7 37.7 162.4 39.5 169.8 40.8 171 42.9 178.9 42.3 179.3 49.4 185 51.3Z"
          />
          <path
            class="fill-none stroke-accent/65"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.75"
            d="M181.9 53.5 176.1 57 171.4 64.3 172.5 78.5 175.8 82.8 174.8 88.1 172.3 89.6 174 91.9 169.5 95.5 167.2 105.3 159 113.9 159 118.5 155.6 121.9 157.8 128.1 154.8 131.8 144 180.7 138.8 189.7 139 195.1 140.9 195.8 136.2 198.2 129.1 212.2 123.2 216.9 123.9 221.1 122.1 223.9 111.4 230.9 107 239.6 100.7 256.4 101.2 279.5 96.7 285.3 98.6 289.6 90.9 285.1 88 288.2 84.9 280.1 87.2 274 81.1 258 76 252.8 54.8 240.3 57.3 241.6 52.4 234.7 52.8 228.3 49.3 220.4 47.4 219.7 48.7 219 45.7 208.7 35 200.2 42.9 175.9 45.4 175.3 44.5 170.5 43.1 170.8 45.8 167.7 42 167.4 44.3 164.7 43.4 156.8 41.6 156.8 45.5 148.6 44.8 145.3 52.3 136.9 65.1 114.8 83.4 91.8 87.2 82.8 97.8 75 101 70.2 102.1 63.4 112.6 48.9 126.9 42.8 138 41 143 32.8 147.4 29.8 152.5 29.3 155.9 31.2 158.9 36.3 161.8 35.5 160.7 37.7 162.4 39.5 169.8 40.8 171 42.9 178.9 42.3 179.3 49.4 185 51.3Z"
          />
          <path
            class="fill-none stroke-white/10"
            stroke-linecap="round"
            stroke-width="1.25"
            d="M154 47c-18 30-27 61-37 96-9 31-21 65-29 111"
          />

          <g class="fill-accent">
            <circle class="fill-accent/70" cx="22" cy="166" r="3" />
            <circle class="fill-accent/45" cx="14" cy="174" r="2" />
            <circle class="fill-accent/45" cx="27" cy="178" r="2" />
          </g>
        </svg>
        <span class="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.65rem] font-semibold tracking-[0.12em] text-white/38">
          TAIWAN
        </span>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/[0.065] p-4" aria-live="polite">
        <Building2 class="size-4 text-accent" aria-hidden="true" />
        <p class="mt-3 text-2xl font-black tabular-nums text-white">
          {{ isLoading ? '—' : institutionCount }}
        </p>
        <p class="mt-0.5 text-xs text-white/52">認可院所</p>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/[0.065] p-4" aria-live="polite">
        <MapPinned class="size-4 text-accent" aria-hidden="true" />
        <p class="mt-3 text-2xl font-black tabular-nums text-white">
          {{ isLoading ? '—' : cityCount }}
        </p>
        <p class="mt-0.5 text-xs text-white/52">縣市覆蓋</p>
      </div>

      <div class="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5">
        <CalendarDays class="size-4 shrink-0 text-accent" aria-hidden="true" />
        <div class="min-w-0">
          <p class="truncate text-xs font-bold tabular-nums text-white">{{ updateTime }}</p>
          <p class="mt-0.5 text-[0.65rem] text-white/48">資料更新</p>
        </div>
      </div>
    </div>
  </aside>
</template>
