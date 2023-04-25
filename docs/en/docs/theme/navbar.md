---
title: Navbar
date: 2023-02-12
---

## Types

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
For more information on setting icons, please see [Guide-> Icon](/docs/guide/icon.html)
:::

## Refer

```ts
export const navbar = [
  { text: 'Guide', link: '/en/docs/guide/introduce', icon: 'Compass' },
  {
    text: 'Reference',
    icon: 'Document',
    children: [
      {
        text: 'Configuration',
        children: [
          { text: 'Theme Configuration', link: '/en/docs/theme/frontmatter' },
          {
            text: 'Markdown Extension',
            link: '/en/docs/theme/custom-container',
          },
          { text: 'Advance', link: '/en/docs/theme/custom-catalog-title' },
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
    icon: 'SubVolume',
    children: [
      { text: '2.x(alpha)', link: 'https://vuepress-theme-reco.recoluan.com/en/' },
      {
        text: '1.x',
        link: 'https://vuepress-theme-reco.recoluan.com/en/views/1.x/',
      },
    ],
  },
  {
    text: 'Message board',
    link: '/en/docs/message-board',
    icon: 'Chat',
  },
]
```