<script setup lang="ts">
import type { CmsNode } from '@bifrost-orbit-cms/sdk'
import type { ActionBlock } from '~/cms/types'

defineProps<{ block: CmsNode<ActionBlock> }>()
</script>

<template>
  <NuxtLink
    v-if="block.fields.link?.href"
    :data-cms-id="block.id"
    :class="['button', block.fields.style ?? 'primary']"
    :to="block.fields.link.href"
    :target="block.fields.link.target ?? undefined"
  >
    {{ block.fields.label }}
  </NuxtLink>
  <span v-else :data-cms-id="block.id" :class="['button', block.fields.style ?? 'primary']">{{ block.fields.label }}</span>
</template>
