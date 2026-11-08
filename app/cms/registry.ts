import type { Component } from 'vue'
import Action from './blocks/Action.vue'
import FeatureSpotlight from './blocks/FeatureSpotlight.vue'
import Hero from './blocks/Hero.vue'

export const registry: Record<string, Component> = {
  action: Action,
  featureSpotlight: FeatureSpotlight,
  hero: Hero,
}
