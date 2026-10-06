<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { Button } from '@/components/ui/button'

const props = withDefaults(defineProps<{
  options: string[]
  label: string
  placeholder?: string
  disabled?: boolean
  selectionUnit?: string
}>(), {
  placeholder: '全部項目',
  disabled: false,
  selectionUnit: '項',
})

const selection = defineModel<string[]>({ required: true })
const open = ref(false)
const id = useId()
const labelId = `multi-select-${id}-label`
const valueId = `multi-select-${id}-value`
const isDisabled = computed(() => props.disabled || !props.options.length)
const summary = computed(() => {
  if (isDisabled.value || !selection.value.length) return props.placeholder
  if (selection.value.length > 2) return `已選 ${selection.value.length} ${props.selectionUnit}`
  return props.options.filter((option) => selection.value.includes(option)).join('、')
})

watch(isDisabled, (disabled) => {
  if (disabled) open.value = false
})
</script>

<template>
  <div class="min-w-0">
    <span :id="labelId" class="mb-2 block text-sm text-foreground">{{ label }}</span>
    <PopoverRoot v-model:open="open">
      <PopoverTrigger as-child>
        <button
          type="button"
          :disabled="isDisabled"
          :aria-labelledby="`${labelId} ${valueId}`"
          class="flex h-13 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-input bg-background px-4 text-left text-base text-foreground outline-none transition-colors hover:border-primary focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:border-input disabled:bg-muted disabled:text-muted-foreground"
        >
          <span :id="valueId" class="min-w-0 truncate">{{ summary }}</span>
          <ChevronDown class="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </button>
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          :aria-label="`${label}選項`"
          align="start"
          :side-offset="8"
          :collision-padding="16"
          class="z-50 flex max-h-[var(--reka-popover-content-available-height)] w-[var(--reka-popover-trigger-width)] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-card p-2 text-card-foreground shadow-lg shadow-brand-deep/10 outline-none"
        >
          <div class="min-h-0 max-h-80 overflow-y-auto overscroll-contain">
            <fieldset class="min-w-0">
              <legend class="sr-only">{{ label }}</legend>
              <label
                v-for="option in options"
                :key="option"
                class="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-base transition-colors hover:bg-secondary/50 focus-within:bg-secondary/50"
              >
                <input
                  v-model="selection"
                  type="checkbox"
                  :value="option"
                  class="size-4 shrink-0 cursor-pointer accent-primary outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                />
                <span class="min-w-0 break-words leading-6">{{ option }}</span>
              </label>
            </fieldset>
          </div>

          <div class="mt-2 flex shrink-0 items-center justify-between gap-2 border-t border-border pt-2">
            <Button
              type="button"
              variant="ghost"
              :disabled="!selection.length"
              class="min-h-11 px-3"
              @click="selection = []"
            >
              清除選取
            </Button>
            <PopoverClose as-child>
              <Button type="button" class="min-h-11 px-4">完成</Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
