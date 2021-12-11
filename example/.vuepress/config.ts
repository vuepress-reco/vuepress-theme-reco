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
      { text: 'Home', link: '/' },
      { text: 'Cat', link: '/categories/cat1/1/' },
      {
        text: 'Categories',
        children: [
          {
            text: 'group',
            link: '/group/bar.html',
            children: [
              {
                text: 'group1',
                link: '/group/bar.html',
              },
              {
                text: 'group2',
                link: '/group/bar1.html',
              },
            ],
          },
          {
            text: 'group',
            link: '/group/bar.html',
            children: [
              {
                text: 'group1',
                link: '/group/bar.html',
              },
              {
                text: 'group2',
                link: '/group/bar1.html',
              },
            ],
          },
        ],
      },
      // NavbarItem
      {
        text: 'Group',
        link: '/group/bar.html',
      },
      // NavbarGroup
      {
        text: 'Blogs',
        children: ['/blogs/category1/blog1.md', '/blogs/category1/blog2.md'],
      },
    ],
    record: 'xxxx',
    cyberSecurityRecord: 'xxx',
    startYear: '2018',
    socialLinks: [
      { icon: 'BrandGithub', link: 'https://github.com/recoluan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' },
      { icon: 'BrandTwitter', link: 'https://twitter.com/reco_luan' }
    ],
    homeElements: ['Banner', 'Blog', 'Footer'],
    autoSetCategory: true
  },
  // debug: true,
})
