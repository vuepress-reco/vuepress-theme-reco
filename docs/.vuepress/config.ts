import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { themeConfig } from './config/index'

export default defineUserConfig<DefaultThemeOptions>({
  title: 'vuepress-theme-reco',
  description: '一款 vuepress 主题集成方案。',
  theme: 'reco',
  themeConfig,
  // debug: true,
})
