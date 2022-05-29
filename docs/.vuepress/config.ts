import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'
import type { DefaultThemeOptions } from 'vuepress'
import { themeConfig } from './config/index'

export default defineUserConfig({
  title: 'vuepress-theme-reco',
  description: '一款 vuepress 主题集成方案。',
  theme: recoTheme(themeConfig),
  // debug: true,
})
