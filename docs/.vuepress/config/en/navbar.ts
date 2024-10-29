export const navbar = [
  { text: 'Home', link: '/en/', icon: 'IconHome' },
  { text: 'Guide', link: '/en/docs/guide/introduce', icon: 'IconCompass' },
  {
    text: 'Reference',
    icon: 'IconDocument',
    children: [
      {
        text: 'Configuration',
        children: [
          {
            text: 'Vuepress Config',
            link: 'https://v2.vuepress.vuejs.org/reference/config.html',
          },
          { text: 'Frontmatter', link: '/en/docs/theme/frontmatter-home' },
          { text: 'Theme Configuration', link: '/en/docs/theme/home' },
          {
            text: 'Markdown Extension',
            link: '/en/docs/theme/custom-container',
          },
        ],
      },
      {
        text: 'Plugins',
        children: [
          { text: 'page', link: '/en/docs/plugins/page' },
          { text: 'comments', link: '/en/docs/plugins/comments' },
          { text: 'vue-previews', link: '/en/docs/plugins/vue-previews' },
          {
            text: 'bulletin-popover',
            link: '/en/docs/plugins/bulletin-popover',
          },
        ],
      },
    ],
  },
  {
    text: 'Version',
    icon: 'IconSubVolume',
    children: [
      {
        text: '2.x(rc)',
        link: 'https://vuepress-theme-reco.recoluan.com/en/',
      },
      {
        text: '1.x',
        link: 'http://v1.vuepress-reco.recoluan.com/en/views/1.x/',
      },
    ],
  },
  { text: 'Examples', link: '/en/docs/others/examples', icon: 'IconFire' },
  {
    text: 'Message board',
    link: '/en/docs/message-board',
    icon: 'IconChat',
  },
]
