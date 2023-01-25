import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'
import { themeConfig } from './config/index'

export default defineUserConfig({
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      title: 'vuepress-reco',
      description: '一款简洁而优雅的 vuepress 博客 & 文档 主题。',
    },
    '/en/': {
      lang: 'en-US',
      title: 'vuepress-theme-reco',
      description: 'A simple and beautiful vuepress Blog & Doc theme.',
    },
  },
  theme: recoTheme(themeConfig),
  // debug: true,
})
