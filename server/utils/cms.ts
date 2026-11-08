import { createCmsClient, type CmsClient } from '@bifrost-orbit-cms/sdk'

let client: CmsClient | undefined

export function useCms(): CmsClient {
  const config = useRuntimeConfig()
  client ??= createCmsClient({
    baseUrl: config.cmsApiUrl,
    apiKey: config.cmsPublicKey,
    previewKey: config.cmsPreviewKey || undefined,
    defaultRegion: config.cmsDefaultRegion,
  })
  return client
}

export const pageCacheKey = (region: string, path: string) => encodeURIComponent(region + path)

export const resolvePublished = defineCachedFunction(
  (region: string, path: string) => useCms().resolve({ region, path }),
  { name: 'cms-page', maxAge: 60, swr: true, getKey: pageCacheKey },
)

export async function isPreviewToken(token: unknown): Promise<boolean> {
  if (typeof token !== 'string' || !useRuntimeConfig().cmsPreviewKey) return false
  return (await useCms().checkPreview(token)).valid
}
