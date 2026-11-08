<script setup lang="ts">
import type { CmsNode } from '@bifrost-orbit-cms/sdk'
import type { HeroBlock } from '~/cms/types'

defineProps<{ block: CmsNode<HeroBlock> }>()
</script>

<template>
  <section :data-cms-id="block.id" class="hero">
    <p v-if="block.fields.eyebrow" class="eyebrow">{{ block.fields.eyebrow }}</p>
    <h1>{{ block.fields.heading }}</h1>
    <div v-if="block.fields.description" v-html="block.fields.description" />
    <div class="actions">
      <CmsBlock v-if="block.fields.primaryAction" :block="block.fields.primaryAction" />
      <CmsBlock v-if="block.fields.secondaryAction" :block="block.fields.secondaryAction" />
    </div>
  </section>
</template>
