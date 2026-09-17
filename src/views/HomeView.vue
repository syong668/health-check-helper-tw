<script setup lang="ts">
import { ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck, Sparkles } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const highlights = [
  { icon: ClipboardCheck, title: '簡單幾題', text: '用幾分鐘整理最近的身體狀態。' },
  { icon: Sparkles, title: '看見重點', text: '把模糊的感受轉成容易理解的方向。' },
  { icon: ShieldCheck, title: '安心開始', text: '以日常紀錄為主，資料留在你的裝置。' },
]
</script>

<template>
  <DefaultLayout>
    <section class="relative overflow-hidden border-b border-border/70 bg-secondary/35">
      <div class="mx-auto grid max-w-6xl gap-12 px-5 py-18 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-28">
        <div class="relative z-10">
          <p class="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-sm font-semibold text-primary">
            <span class="size-2 rounded-full bg-accent" aria-hidden="true"></span>
            你的日常健康整理工具
          </p>
          <h1 class="max-w-3xl text-5xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            先照顧自己，<br /><span class="text-primary">從了解開始。</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            透過溫和、簡單的自我檢視，幫你整理最近的睡眠、壓力與精力狀態，找到下一步可以做的小行動。
          </p>
          <div class="mt-9 flex flex-wrap items-center gap-4">
            <RouterLink to="/checkup">
              <Button size="lg" class="gap-2 px-6">開始今日檢測 <ArrowRight :size="18" aria-hidden="true" /></Button>
            </RouterLink>
            <a href="#how-it-works" class="text-sm font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary">先看看怎麼用</a>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-md">
          <div class="absolute -inset-5 rounded-[2rem] bg-accent/30 blur-2xl" aria-hidden="true"></div>
          <Card class="relative overflow-hidden border-primary/10 bg-background/95 shadow-xl shadow-primary/10">
            <CardContent class="p-7 sm:p-9">
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-sm font-semibold text-primary">今日狀態</p>
                  <h2 class="mt-2 text-3xl font-bold">從一個問題開始</h2>
                </div>
                <CheckCircle2 class="text-primary" :size="28" aria-hidden="true" />
              </div>
              <div class="mt-8 space-y-4">
                <div class="rounded-xl bg-secondary/70 p-4">
                  <p class="text-sm text-muted-foreground">最近的睡眠品質如何？</p>
                  <div class="mt-3 flex gap-2">
                    <span v-for="label in ['不錯', '普通', '需要調整']" :key="label" class="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold">{{ label }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-3 text-sm text-muted-foreground">
                  <span class="h-1.5 flex-1 rounded-full bg-primary"></span>
                  <span class="h-1.5 flex-1 rounded-full bg-border"></span>
                  <span class="h-1.5 flex-1 rounded-full bg-border"></span>
                  1 / 3
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section id="about" class="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
      <div class="grid gap-5 md:grid-cols-3">
        <Card v-for="highlight in highlights" :key="highlight.title" class="border-border/70 shadow-none">
          <CardContent class="p-6">
            <component :is="highlight.icon" class="mb-5 text-primary" :size="25" aria-hidden="true" />
            <h2 class="text-xl font-bold">{{ highlight.title }}</h2>
            <p class="mt-2 leading-7 text-muted-foreground">{{ highlight.text }}</p>
          </CardContent>
        </Card>
      </div>
    </section>

    <section id="how-it-works" class="bg-foreground py-16 text-background lg:py-20">
      <div class="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-accent">How it works</p>
          <h2 class="mt-3 text-3xl font-bold sm:text-4xl">三個步驟，留一點時間給自己。</h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-3">
          <div v-for="(step, index) in ['回答幾個日常問題', '看見目前的生活狀態', '帶走一個小小建議']" :key="step" class="border-t border-background/20 pt-4">
            <span class="font-display text-2xl font-bold text-accent">0{{ index + 1 }}</span>
            <p class="mt-5 font-semibold leading-7">{{ step }}</p>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>
