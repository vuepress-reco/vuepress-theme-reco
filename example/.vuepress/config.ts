import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  // base: '/reco/',
  title: 'vuepress-theme-reco',
  description: 'Just playing around',
  theme: 'reco',
  themeConfig: {
    style: '@vuepress-reco/style-default',
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
        children: ['/blogs/category1/blog1.md', '/blogs/category1/blog2.md'],
      },
    ],
    autoSetCategory: true,
    autoAddCategoryToNavbar: true
  },
  // debug: true,
})
