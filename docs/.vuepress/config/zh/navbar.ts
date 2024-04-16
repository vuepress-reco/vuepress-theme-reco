export const navbar = [
  { text: '指南', link: '/docs/guide/introduce', icon: 'Compass' },
  {
    text: '参考',
    icon: 'Document',
    children: [
      {
        text: '配置',
        children: [
          {
            text: 'Vuepress 配置',
            link: 'https://v2.vuepress.vuejs.org/zh/reference/config.html',
          },
          { text: 'Frontmatter', link: '/docs/theme/frontmatter-home' },
          { text: '主题配置', link: '/docs/theme/home' },
          { text: 'Markdown 扩展', link: '/docs/theme/custom-container' },
          { text: '其他', link: '/docs/theme/custom-style' },
        ],
      },
      {
        text: '插件',
        children: [
          { text: 'page', link: '/docs/plugins/page' },
          { text: 'comments', link: '/docs/plugins/comments' },
          { text: 'vue-previews', link: '/docs/plugins/vue-previews' },
          { text: 'bulletin-popover', link: '/docs/plugins/bulletin-popover' },
        ],
      },
    ],
  },
  {
    text: '版本',
    icon: 'SubVolume',
    children: [
      { text: '2.x(rc)', link: 'https://vuepress-theme-reco.recoluan.com/' },
      {
        text: '1.x',
        link: 'http://v1.vuepress-reco.recoluan.com/views/1.x/',
      },
    ],
  },
  { text: '博客', link: '/posts', icon: 'DocumentAttachment' },
  { text: '案例', link: '/docs/others/examples', icon: 'Fire' },
  { text: '留言板', link: '/docs/message-board', icon: 'Chat' },
]
