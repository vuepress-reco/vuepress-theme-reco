import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  // base: '/reco/',
  title: 'vuepress-theme-reco',
  description: 'Just playing around',
  theme: 'reco',
  themeConfig: {
    logo: '/hero_black.png',
    authorAvatar: '/logo.png',
    author: 'reco_luan',
    docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco-next',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '',
    series: {
      '/group/': [
        {
          text: 'group',
          children: ['/group/bar.md', '/group/foo.md'],
        },
      ],
      '/blogs/': [
        {
          text: 'blogs1',
          children: ['/blogs/category1/blog1.md', '/blogs/category1/blog2.md'],
        },
      ],
    },
    navbar: [
      {
        text: 'Blogs',
        children: [
          {
            text: '是大法师的',
            children: ['/blogs/category1/blog1.md', '/blogs/category1/blog2.md']
          },
          {
            text: '爽肤水的饭',
            children: ['/blogs/category1/blog1.md', '/blogs/category1/blog2.md']
          }
        ],
      },
    ],
    autoSetCategory: true,
    autoAddCategoryToNavbar: true,
    vuePreviewsDir: './example/.vuepress/vue-previews'
  },
  // debug: true,
})
