<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogTitle } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <DialogTitle data-slot="dialog-title" :class="cn('text-lg font-bold leading-none', props.class)">
    <slot />
  </DialogTitle>
</template>
