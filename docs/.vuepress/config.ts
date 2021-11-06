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
    navbar: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/docs/guide/introduce' },
      { text: '参考',
        children: [
          { text: '风格开发 API', link: '/docs/style-dev-api/' },
          { text: '默认风格 API', link: '/docs/style-default-api/introduce' }
        ]
      }
    ],
    series: {
      // todo README.md 无法展示，没有对 '' 进行处理
      '/docs/guide/': ['introduce', 'architecture', 'getting-started'],
      '/docs/style-default-api/': [
        {
          text: '基础',
          children: [ 'introduce', 'usage' ]
        },
        {
          text: '高级',
          children: [ 'home', 'series', 'comments' ]
        }
      ]
    },
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
