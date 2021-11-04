import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  title: 'vuepress-theme-reco',
  description: '一款 vuepress 主题集成方案。',
  theme: 'reco',
  themeConfig: {
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'reco_luan',
    docsRepo: 'https://github.com/vuepress-reco/docs-v2',
    docsBranch: 'main',
    docsDir: '/',
    lastUpdatedText: '最后更新时间',
    // series 为原 sidebar
    series: {
      '/docs/guide/': ['introduce', 'architecture', 'getting-started'], // README.md 无法展示，没有对 '' 进行处理
      '/docs/theme-reco/': [
        {
          text: 'module one',
          children: ['home', 'theme']
        },
        {
          text: 'module two',
          children: ['api', 'plugin']
        }
      ]
    },
    navbar:
    [
      { text: 'Home', link: '/' },
      { text: '指南', link: '/docs/guide/introduce' },
      { text: '参考',
        children: [
          { text: 'plugin-page', link: '' },
          { text: '风格开发 API', link: '/docs/styles/style-dev-api' }
        ]
      },
      { text: '风格',
        children: [
          { text: '默认风格 API', link: '/docs/styles/style-default-api' },
        ]
      },
    ],
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'jvc9s4BkJYQNOcpsbVTPMePe-gzGzoHsz',
    //   appKey: 'Js91M9DfM9vPwVaUj7xdkbxh',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  },
  // debug: true,
})
