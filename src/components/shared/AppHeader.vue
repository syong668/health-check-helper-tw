<script setup lang="ts">
import { Cross, ExternalLink, Search } from '@lucide/vue'
</script>

<template>
  <header class="relative z-30 border-b border-white/10 bg-brand-deep text-white">
    <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
      <a href="#" class="flex items-center gap-3" aria-label="好檢回到首頁">
        <span class="relative grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground ring-4 ring-accent/15">
          <Cross class="size-5" :stroke-width="3" aria-hidden="true" />
        </span>
        <span>
          <span class="block text-lg font-black tracking-tight">好檢</span>
          <span class="block text-[10px] font-medium tracking-[0.14em] text-white/55">HEALTH FINDER</span>
        </span>
      </a>

      <nav class="flex items-center gap-2 sm:gap-3" aria-label="主要導覽">
        <a href="#search" class="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-white/70 transition hover:bg-white/8 hover:text-white">
          <Search class="size-4" aria-hidden="true" />
          <span class="hidden sm:inline">院所查詢</span>
        </a>
        <a
          href="https://data.gov.tw/dataset/6624"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-9 items-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
        >
          <ExternalLink class="size-4" aria-hidden="true" />
          <span class="hidden sm:inline">官方資料集</span>
        </a>
      </nav>
    </div>
  </header>
</template>
