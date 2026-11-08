<script setup lang="ts">
import type { CmsComponent } from '@bifrost-orbit-cms/sdk'
import { registry } from '~/cms/registry'

const props = defineProps<{ block: CmsComponent }>()
const component = computed(() => registry[props.block.type])
const dev = import.meta.dev
</script>

<template>
  <component :is="component" v-if="component" :block="block" />
  <p v-else-if="dev" :data-cms-id="block.id">No component for <code>{{ block.type }}</code> yet.</p>
</template>
