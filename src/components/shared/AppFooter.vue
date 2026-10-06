<script setup lang="ts">
import { Cross } from '@lucide/vue'
</script>

<template>
  <footer class="border-t border-border bg-card">
    <div class="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div class="flex items-center gap-3">
        <span class="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Cross class="size-4" :stroke-width="3" aria-hidden="true" />
        </span>
        <div>
          <p class="font-bold text-foreground">好檢 · 健康檢查認可醫療機構查詢</p>
        </div>
      </div>
      <p class="max-w-lg text-xs leading-6 sm:text-right">
        資料來源：勞動部職業安全衛生署。<br>實際認可狀態與預約資訊，請以官方公告及醫療機構回覆為準。
      </p>
    </div>
  </footer>
</template>
