<script setup lang="ts">
import { Cross, ExternalLink, Search } from '@lucide/vue'
</script>

<template>
  <header class="relative z-30 bg-background px-3 sm:px-5 lg:px-8">
    <div class="mx-auto flex min-h-20 max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-b-3xl bg-header px-4 py-4 text-header-foreground sm:px-6 lg:rounded-b-[2rem] lg:px-8">
      <a href="#" class="flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-header-foreground" aria-label="好檢回到首頁">
        <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-header-logo text-header-logo-foreground">
          <Cross class="size-5" :stroke-width="3" aria-hidden="true" />
        </span>
        <span>
          <span class="block text-lg font-black tracking-tight">好檢</span>
          <span class="block text-[11px] font-medium tracking-[0.14em] text-header-foreground/90">HEALTH FINDER</span>
        </span>
      </a>

      <nav class="flex items-center gap-2 sm:gap-3" aria-label="主要導覽">
        <a href="#search" class="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl bg-header-foreground/5 px-3 text-sm font-semibold text-header-foreground transition-colors hover:bg-header-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-header-foreground sm:px-4">
          <Search class="size-4" aria-hidden="true" />
          <span class="sr-only sm:not-sr-only">院所查詢</span>
        </a>
        <a
          href="https://data.gov.tw/dataset/6624"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="官方資料集（另開新分頁）"
          class="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-header-foreground/90 transition-colors hover:bg-header-foreground/8 hover:text-header-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-header-foreground sm:px-4"
        >
          <ExternalLink class="size-4" aria-hidden="true" />
          <span class="sr-only sm:not-sr-only">官方資料集</span>
        </a>
      </nav>
    </div>
  </header>
</template>
