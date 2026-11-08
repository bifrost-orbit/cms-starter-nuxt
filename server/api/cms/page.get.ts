export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = typeof query.path === 'string' && query.path.startsWith('/') ? query.path : '/'
  const region = useRuntimeConfig().cmsDefaultRegion

  if (await isPreviewToken(query.preview)) {
    const result = await useCms().resolve({ region, path, preview: true })
    return { result, bridge: `${useCms().origin}/bridge.js` }
  }
  return { result: await resolvePublished(region, path), bridge: null }
})
