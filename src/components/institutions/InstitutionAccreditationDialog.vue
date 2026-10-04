<script setup lang="ts">
import { CalendarRange, ChevronRight } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { MedicalInstitution } from '@/types/institution'

defineProps<{
  institution: MedicalInstitution
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        type="button"
        variant="outline"
        class="h-auto w-full justify-between rounded-xl bg-secondary/20 px-4 py-3 text-foreground shadow-none hover:bg-secondary/60"
      >
        <span class="flex items-center gap-2">
          <CalendarRange class="size-4 text-primary" aria-hidden="true" />
          查看健檢類別及期限
        </span>
        <ChevronRight class="size-4 text-muted-foreground" aria-hidden="true" />
      </Button>
    </DialogTrigger>

    <DialogContent class="max-h-[calc(100vh-2rem)] overflow-hidden p-0 sm:max-w-xl">
      <DialogHeader class="border-b border-border/70 px-5 pb-5 pr-14 pt-6 sm:px-6 sm:pr-14">
        <p class="text-xs font-bold tracking-wide text-primary">認可健檢資訊</p>
        <DialogTitle class="text-xl leading-snug sm:text-2xl">
          {{ institution.name }}
        </DialogTitle>
        <DialogDescription class="leading-6">
          以下為勞動部公開資料所列的健檢類別與認可期限。
        </DialogDescription>
      </DialogHeader>

      <div class="max-h-[min(60vh,32rem)] overflow-y-auto px-5 pb-5 sm:px-6 sm:pb-6">
        <div class="divide-y divide-border/70">
          <div
            v-for="item in institution.accreditations"
            :key="`${item.category}-${item.validUntil}`"
            class="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <span class="font-semibold text-foreground">{{ item.category }}</span>
            <span v-if="item.validFrom && item.validUntil" class="shrink-0 text-sm text-muted-foreground">
              {{ item.validFrom }} 至 {{ item.validUntil }}
            </span>
            <span v-else class="shrink-0 text-sm text-muted-foreground">期限請洽院所</span>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
