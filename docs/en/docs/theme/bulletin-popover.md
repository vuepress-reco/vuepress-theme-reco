---
title: Announcement
date: 2022-02-05 22:17:55
---

::: tip
The content of the announcement is displayed in the upper right corner of the page in the form of a pop-up window. The display and hiding of the announcement depends on the variables in `sessionStorage`, so every time the website is opened, the announcement pop-up window will be displayed.
:::

## Configure

**width**

- description: Announcement width, unit `px`
- default：`300`

**title**

- description: Announcement title
- default：`公告`

**body**

- description: Announcement content
- type: `{
    type: 'text' | 'hr' | 'title' | 'buttongroup',
    content?: string,
    children?: Array<{ text: string, link: string }> 
  }`
- type description:
  |type|description|
  |-|-|
  |title|Title, need to configure the `content` property|
  |text|Text, need to configure the `content` property|
  |hr|Break line, similar to the `hr` tag, this type does not need to configure other properties|
  |buttongroup|Button group, only this type needs to configure `children`|
- Case: Take the theme official website as an example
- 
  ```ts
  // .vuepress/config.ts

  import { defineUserConfig } from 'vuepress'
  import { recoTheme } from 'vuepress-theme-reco'

  export default defineUserConfig({
    theme: recoTheme({
      bulletin: {
        body: [
          {
            type: 'text',
            content: `🎉🎉🎉 The reco theme 2.x has been released in RC version, and there will be no major updates until the latest version is released.
            Everyone can enjoy the early adopters, and I hope you will actively feedback the experience in the QQ group and GitHub, and I will respond as soon as possible.`,
            style: 'font-size: 12px;'
          },
          { type: 'hr' },
          { type: 'title', content: 'QQ 群' },
          {
            type: 'text',
            content: `
            <ul>
              <li>QQ群1：1037296104</li>
              <li>QQ群2：1061561395</li>
              <li>QQ群3：962687802</li>
            </ul>`,
            style: 'font-size: 12px;'
          },
          { type: 'hr' },
          { type: 'title', content: 'GitHub' },
          {
            type: 'text',
            content: `
            <ul>
              <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco/issues">Issues<a/></li>
              <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco/discussions/1">Discussions<a/></li>
            </ul>`,
            style: 'font-size: 12px;'
          },
          { type: 'hr', },
          {
            type: 'buttongroup',
            children: [
              { text: 'donate', link: '/docs/others/donate.html' }
            ]
          }
        ],
      }
    })
  }
  ```


