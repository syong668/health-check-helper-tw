<script setup lang="ts">
import {
  MapPin,
  Navigation,
  Phone,
  UserRound,
} from '@lucide/vue'
import InstitutionAccreditationDialog from '@/components/institutions/InstitutionAccreditationDialog.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { MedicalInstitution } from '@/types/institution'

const props = defineProps<{
  institution: MedicalInstitution
}>()

const phoneHref = `tel:${props.institution.phone.replace(/[^\d+]/g, '')}`
const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.institution.address)}`
</script>

<template>
  <Card class="institution-card h-full gap-0 rounded-2xl border-border py-0 shadow-sm shadow-brand-deep/5 transition-colors duration-200 hover:border-primary/50 focus-within:border-primary/50">
    <CardContent class="flex h-full flex-col p-5 sm:p-6">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h3 class="text-xl leading-7 text-foreground [overflow-wrap:anywhere]">
            {{ institution.name }}
          </h3>
          <p class="mt-2 text-xs leading-5 text-muted-foreground">機構代碼 {{ institution.code }}</p>
        </div>
        <span class="shrink-0 rounded-lg bg-secondary px-2.5 py-1 text-xs leading-5 text-secondary-foreground">
          {{ institution.city }}
        </span>
      </div>

      <div class="mt-5 space-y-3 text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
        <p class="flex items-start gap-3">
          <MapPin class="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{{ institution.address }}</span>
        </p>
        <p class="flex items-center gap-3">
          <Phone class="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>{{ institution.phone }}<template v-if="institution.extension && institution.extension !== '0'"> 分機 {{ institution.extension }}</template></span>
        </p>
        <p v-if="institution.contactPerson" class="flex items-center gap-3">
          <UserRound class="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>健檢聯絡人：{{ institution.contactPerson }}</span>
        </p>
      </div>

      <div class="mt-auto pt-5">
        <InstitutionAccreditationDialog
          v-if="institution.accreditations.length"
          :institution="institution"
        />

        <div class="mt-4 grid grid-cols-2 gap-3">
          <Button as="a" :href="phoneHref" variant="outline" class="min-h-11 rounded-lg shadow-none">
            <Phone aria-hidden="true" />
            撥打電話
          </Button>
          <Button as="a" :href="mapHref" target="_blank" rel="noopener noreferrer" class="min-h-11 rounded-lg shadow-none">
            <Navigation aria-hidden="true" />
            地圖導航
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
