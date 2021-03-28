import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const path = require('path')

export default defineUserConfig<DefaultThemeOptions>({
  title: 'vuepress-theme-reco',
  description: 'Just playing around',
  theme: 'reco',
  debug: true
})
