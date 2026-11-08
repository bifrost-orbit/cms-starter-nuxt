<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
useSeoMeta({ title: props.error.statusCode === 404 ? 'Page not found' : 'Something went wrong' })
</script>

<template>
  <main>
    <h1 v-if="error.statusCode === 404">We couldn't find that page</h1>
    <h1 v-else>Something went wrong</h1>
    <p><NuxtLink to="/">Back to the home page</NuxtLink></p>
  </main>
</template>
