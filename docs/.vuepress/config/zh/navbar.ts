export const navbar = [
  { text: '首页', link: '/', icon: 'IconHome' },
  { text: '指南', link: '/docs/guide/introduce', icon: 'IconCompass' },
  {
    text: '参考',
    icon: 'IconDocument',
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
    icon: 'IconSubVolume',
    children: [
      { text: '2.x(rc)', link: 'https://vuepress-theme-reco.recoluan.com/' },
      {
        text: '1.x',
        link: 'http://v1.vuepress-reco.recoluan.com/views/1.x/',
      },
    ],
  },
  { text: '博客', link: '/posts', icon: 'IconDocumentAttachment' },
  { text: '案例', link: '/docs/others/examples', icon: 'IconFire' },
  { text: '留言板', link: '/docs/message-board', icon: 'IconChat' },
]
