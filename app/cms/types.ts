// Types for the components this starter draws. Run `npm run cms:types` to replace them with your space's own.
import type { CmsImage, CmsLink, CmsNode, CmsRichText } from "@bifrost-orbit-cms/sdk";

export interface ActionBlock {
  type: "action"
  label: string
  link?: CmsLink | null
  style?: "primary" | "secondary"
}

export interface FeatureSpotlightBlock {
  type: "featureSpotlight"
  eyebrow?: string
  heading: string
  body?: CmsRichText
  image?: CmsImage | null
  action?: CmsNode<ActionBlock> | null
}

export interface HeroBlock {
  type: "hero"
  eyebrow?: string
  heading: string
  description?: CmsRichText
  primaryAction?: CmsNode<ActionBlock> | null
  secondaryAction?: CmsNode<ActionBlock> | null
}

declare module "@bifrost-orbit-cms/sdk" {
  interface CmsBlockTypes {
    action: ActionBlock
    featureSpotlight: FeatureSpotlightBlock
    hero: HeroBlock
  }
}
