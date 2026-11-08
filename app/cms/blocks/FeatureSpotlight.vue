<script setup lang="ts">
import { cmsImageSrcSet, type CmsNode } from '@bifrost-orbit-cms/sdk'
import type { FeatureSpotlightBlock } from '~/cms/types'

defineProps<{ block: CmsNode<FeatureSpotlightBlock> }>()
</script>

<template>
  <section :data-cms-id="block.id" class="spotlight">
    <p v-if="block.fields.eyebrow" class="eyebrow">{{ block.fields.eyebrow }}</p>
    <h2>{{ block.fields.heading }}</h2>
    <div v-if="block.fields.body" v-html="block.fields.body" />
    <img
      v-if="block.fields.image"
      :src="block.fields.image.url"
      :srcset="cmsImageSrcSet(block.fields.image.url, block.fields.image.width)"
      sizes="(min-width: 768px) 50vw, 100vw"
      :width="block.fields.image.width ?? undefined"
      :height="block.fields.image.height ?? undefined"
      :alt="block.fields.image.alt"
      loading="lazy"
    >
    <CmsBlock v-if="block.fields.action" :block="block.fields.action" />
  </section>
</template>
