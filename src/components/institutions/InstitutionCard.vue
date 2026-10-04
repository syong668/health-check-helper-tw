<script setup lang="ts">
import {
  Building2,
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
  <Card class="institution-card group h-full gap-0 overflow-hidden rounded-2xl border-border/70 py-0 shadow-lg shadow-brand-deep/8 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-brand-deep/12">
    <CardContent class="flex h-full flex-col p-5 sm:p-6">
      <div class="flex items-start justify-between gap-4">
        <div class="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Building2 class="size-5" aria-hidden="true" />
        </div>
        <span class="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
          {{ institution.city }}
        </span>
      </div>

      <div class="mt-5">
        <p class="text-xs font-semibold tracking-wide text-muted-foreground">機構代碼 {{ institution.code }}</p>
        <h2 class="mt-2 text-xl font-bold leading-snug tracking-tight text-foreground">
          {{ institution.name }}
        </h2>
      </div>

      <div class="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
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

        <div class="mt-3 grid grid-cols-2 gap-3 border-t border-border/70 pt-5">
          <Button as="a" :href="phoneHref" variant="outline" class="rounded-lg">
            <Phone aria-hidden="true" />
            撥打電話
          </Button>
          <Button as="a" :href="mapHref" target="_blank" rel="noopener noreferrer" class="rounded-lg">
            <Navigation aria-hidden="true" />
            地圖導航
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
