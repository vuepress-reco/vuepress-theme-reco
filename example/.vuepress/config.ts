import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      title: 'vuepress-theme-reco',
      description: '中文描述',
    },
    '/en/': {
      lang: 'en-US',
      title: 'vuepress-theme-reco',
      description: '英文描述',
    },
  },
  theme: 'reco',
  themeConfig: {
    locales: {
      '/': {
        selectLanguageName: '简体中文',
      },
      '/en/': {
        selectLanguageName: 'English',
      },
    },
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
          icon: 'Language',
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
        icon: 'Language',
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
    vuePreviewsDir: './example/.vuepress/vue-previews',
    bulletin: {
      body: [
        {
          type: 'title',
          content: '欢迎加入QQ交流群 🎉🎉🎉',
        },
        {
          type: 'text',
          content: `
          <ul>
            <li>QQ群1：1037296104</li>
            <li>QQ群2：1061561395</li>
          </ul>`,
          style: 'font-size: 12px;'
        },
        {
          type: 'hr',
        },
        {
          type: 'text',
          content: `🎉🎉🎉 reco 主题 2.x 已经发布 alpha 版本，此版本仅为尝鲜版本，功能不完整，且 UI 及功能在 latest 版本之前均为做出较大，谨慎用于生产环境。
          <ul>
            <li><a href="/views/2.x/">Usage<a/></li>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
          </ul>`,
          style: 'font-size: 12px;'
        },
        {
          type: 'hr',
        },
        {
          type: 'buttongroup',
          children: [
            {
              text: '打赏',
              link: '/views/other/donate.html'
            },
            {
              text: '打赏',
              link: '/views/other/donate.html'
            }
          ]
        }
      ],
    }
  },
  // debug: true,
})
