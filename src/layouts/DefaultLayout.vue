<script setup lang="ts">
import AppFooter from '@/components/shared/AppFooter.vue'
import AppHeader from '@/components/shared/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
