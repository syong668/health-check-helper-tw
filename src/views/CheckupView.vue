<script setup lang="ts">
import { ArrowLeft, ClipboardCheck } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <DefaultLayout>
    <section class="mx-auto flex min-h-[calc(100vh-9rem)] max-w-3xl items-center px-5 py-16 lg:px-8">
      <Card class="w-full border-border/70 shadow-sm">
        <CardHeader class="border-b border-border/70 pb-6">
          <div class="mb-4 grid size-12 place-items-center rounded-xl bg-secondary text-primary">
            <ClipboardCheck :size="24" aria-hidden="true" />
          </div>
          <CardTitle class="text-3xl">今日檢測準備中</CardTitle>
        </CardHeader>
        <CardContent class="space-y-6 p-6 sm:p-8">
          <p class="max-w-xl leading-8 text-muted-foreground">
            這裡會是之後的健康檢測流程入口。目前先把頁面與導覽路徑準備好，下一階段再加入問題表單與進度管理。
          </p>
          <RouterLink to="/">
            <Button variant="outline" class="gap-2"><ArrowLeft :size="17" aria-hidden="true" /> 回到首頁</Button>
          </RouterLink>
        </CardContent>
      </Card>
    </section>
  </DefaultLayout>
</template>