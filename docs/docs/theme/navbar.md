---
title: 导航栏
date: 2023-02-12
---

## 类型

```ts
interface NavbarItemBasic {
  text: string
  link?: string
  icon?: string
}

interface NavbarItem extends NavbarItemBasic {
  children?: NavbarItemBasic[]
}

type Navbar = NavbarItem[]
```

::: tip
设置图标请参考 [指南 -> 图标](/docs/guide/icon.html)
:::

## 参考

```ts
export const navbar = [
  { text: '指南', link: '/docs/guide/introduce', icon: 'Compass' },
  {
    text: '参考',
    icon: 'Document',
    children: [
      {
        text: '配置',
        children: [
          { text: '主题配置', link: '/docs/theme/frontmatter' },
          { text: 'Markdown 扩展', link: '/docs/theme/custom-container' },
          { text: '高级', link: '/docs/theme/custom-catalog-title' },
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
      { text: '2.x(alpha)', link: 'https://vuepress-theme-reco.recoluan.com/' },
      {
        text: '1.x',
        link: 'https://vuepress-theme-reco.recoluan.com/views/1.x/',
      },
    ],
  },
  { text: '留言板', link: '/docs/message-board', icon: 'Chat' },
]
```