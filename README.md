# CMS Orbit starter for Nuxt

A Nuxt website that reads its pages from [CMS Orbit](https://bifrostorbit.com/products/cms-orbit/), the headless CMS in Bifröst Orbit. It is the finished project from the [Nuxt quickstart](https://docs.bifrostorbit.com/cms/developers/quickstart-nuxt/): every published page at its own address, rendered on the server, your own Vue components for the blocks editors place, drafts in the live preview, and a signed webhook that clears the page cache when editors publish.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbifrost-orbit%2Fcms-starter-nuxt&env=NUXT_CMS_API_URL,NUXT_CMS_PUBLIC_KEY,NUXT_CMS_DEFAULT_REGION&envDescription=The%20API%20address%2C%20public%20key%20and%20region%20from%20CMS%20Orbit&envLink=https%3A%2F%2Fdocs.bifrostorbit.com%2Fcms%2Fdevelopers%2Fquickstart-nuxt%2F&project-name=website&repository-name=website)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/bifrost-orbit/cms-starter-nuxt?quickstart=1)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/bifrost-orbit/cms-starter-nuxt)

The buttons ask for `NUXT_CMS_API_URL`, `NUXT_CMS_PUBLIC_KEY` and `NUXT_CMS_DEFAULT_REGION`. Add `NUXT_CMS_PREVIEW_KEY` for previews and `NUXT_CMS_WEBHOOK_SECRET` for refresh on publish in the project's settings afterwards. On Vercel and Netlify each server function keeps its own page cache, so a webhook clears only one of them and other copies catch up within 60 seconds; mount a shared store for `cache` under `nitro.storage` in `nuxt.config.ts` for an instant refresh everywhere.

## Set up

1. **Create your copy.** Select **Use this template** on GitHub, or run `gh repo create my-website --template bifrost-orbit/cms-starter-nuxt --private --clone`.
2. **Add your settings.** Copy `.env.example` to `.env` and fill in the API address, keys and region from **Configuration › API keys** and **Configuration › Environments** in CMS Orbit.
3. **Run it.** Run `npm install`, then `npm run dev`, and open `http://localhost:3000`.

## What's inside

| File | What it does |
| --- | --- |
| `nuxt.config.ts` | The settings, kept on the server so the browser never sees a key |
| `server/utils/cms.ts` | The CMS Orbit client, the page cache and the preview token check |
| `server/api/cms/page.get.ts` | Reads a page, or its draft when the preview token is valid |
| `app/pages/[...slug].vue` | One page for every address: redirects, not found, title and description |
| `app/components/CmsBlock.vue`, `app/cms/registry.ts` | Which Vue component draws which CMS component |
| `app/cms/blocks/` | The components: `hero`, `featureSpotlight` and `action` |
| `server/api/cms-webhook.post.ts` | The signed webhook that clears cached pages when editors publish |

## Make it yours

- Run `npm run cms:types` to write your space's components to `app/cms/types.ts`.
- Draw your components in `app/cms/blocks/` and register them in `app/cms/registry.ts`, using the component keys from your own space.
- For the live preview, set **Preview URL** in the space's **Settings**. For refresh on publish, add a webhook to `https://your-website/api/cms-webhook` and put its secret in `NUXT_CMS_WEBHOOK_SECRET`. The [quickstart](https://docs.bifrostorbit.com/cms/developers/quickstart-nuxt/) explains both.
- To run it on your own server, run `npm run build`, then `node --env-file=.env .output/server/index.mjs`, or `npm start` when the settings are already in the environment.

Needs Node.js 20 or later and `@bifrost-orbit-cms/sdk` 0.12.

## Licence

MIT. See [LICENSE](LICENSE).
