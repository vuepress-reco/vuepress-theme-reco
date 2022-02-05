import { navbar } from './navbar'
import { series } from './series'
import { bulletin } from './bulletin'
import { valineConfig } from './valineConfig'

export const themeConfig = {
  style: '@vuepress-reco/style-default',
  logo: '/logo.png',
  author: 'reco_luan',
  docsRepo: 'https://github.com/vuepress-reco/docs-v2',
  docsBranch: 'main',
  docsDir: '/',
  lastUpdatedText: '最后更新时间',
  navbar,
  series,
  valineConfig,
  vuePreviewsDir: './docs/.vuepress/vue-previews',
  bulletin
}
