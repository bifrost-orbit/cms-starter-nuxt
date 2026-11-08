<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
const path = '/' + (Array.isArray(slug) ? slug.join('/') : slug || '')

const { data } = await useFetch('/api/cms/page', { query: { path, preview: route.query.preview } })
const result = data.value?.result

if (!result || result.kind === 'notFound') throw createError({ statusCode: 404, statusMessage: 'Page not found' })
if (result.kind === 'gone') throw createError({ statusCode: 410, statusMessage: 'Page removed' })
if (result.kind === 'redirect') await navigateTo(result.to, { redirectCode: result.status, external: !result.to.startsWith('/') })

const page = result.kind === 'page' ? result.page : null
const bridge = data.value?.bridge

if (page) {
  useSeoMeta({ title: page.seo.title, description: page.seo.description })
  useHead({ htmlAttrs: { lang: page.locale }, script: bridge ? [{ src: bridge, defer: true }] : [] })
}
</script>

<template>
  <main v-if="page">
    <CmsBlock v-for="block in page.components" :key="block.id" :block="block" />
  </main>
</template>
