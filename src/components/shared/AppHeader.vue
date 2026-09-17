<script setup lang="ts">
import { Activity } from '@lucide/vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="border-b border-border/70 bg-background/90 backdrop-blur">
    <div class="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3 text-foreground">
        <span class="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Activity :size="21" aria-hidden="true" />
        </span>
        <span>
          <span class="block font-display text-lg font-bold tracking-tight">日常健檢所</span>
          <span class="block text-xs text-muted-foreground">Health Check Helper</span>
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex" aria-label="主要導覽">
        <a href="#about" class="transition-colors hover:text-foreground">關於工具</a>
        <a href="#how-it-works" class="transition-colors hover:text-foreground">使用方式</a>
      </nav>
    </div>
  </header>
</template>
