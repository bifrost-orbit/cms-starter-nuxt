import { verifyWebhook } from '@bifrost-orbit-cms/sdk'

export default defineEventHandler(async (event) => {
  const secret = useRuntimeConfig().cmsWebhookSecret
  const result = secret && await verifyWebhook({
    body: (await readRawBody(event, 'utf8')) ?? '',
    timestamp: getHeader(event, 'x-orbit-timestamp'),
    signature: getHeader(event, 'x-orbit-signature'),
    secret,
  })
  if (!result || !result.valid) {
    setResponseStatus(event, 401)
    return null
  }

  const { event: name, data } = result
  const { url, region } = data
  const cache = useStorage('cache')
  const onePage = name.startsWith('content.') && typeof url === 'string' && typeof region === 'string' && !data.previousUrl && data.contentType !== 'sharedSection'
  if (onePage) await cache.removeItem(`nitro:functions:cms-page:${pageCacheKey(region, url)}.json`)
  else if (name !== 'webhook.test') await cache.clear('nitro:functions:cms-page')

  setResponseStatus(event, 204)
  return null
})
