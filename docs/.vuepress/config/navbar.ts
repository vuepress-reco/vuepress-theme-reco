export const navbar = [
  { text: '指南', link: '/docs/guide/introduce' },
  { text: '参考',
    children: [
      {
        text: '风格',
        children: [
          { text: '默认风格配置', link: '/docs/style-default-api/introduce' },
          { text: '风格开发 API', link: '/docs/style-dev-api/' }
        ]
      },
      {
        text: '内置插件',
        children: [
          { text: 'page', link: '/docs/plugins/page' },
          { text: 'comments', link: '/docs/plugins/comments' },
          { text: 'vue-previews', link: '/docs/plugins/vue-previews' },
          { text: 'bulletin-popover', link: '/docs/plugins/bulletin-popover' }
        ]
      }
    ]
  },
  {
    text: '版本',
    children: [
      { text: '2.x(alpha)', link: 'http://v2.vuepress-reco.recoluan.com/' },
      { text: '1.x', link: 'https://vuepress-theme-reco.recoluan.com/views/1.x/' },
    ],
  },
  { text: '留言板', link: '/docs/message-board' },
]
