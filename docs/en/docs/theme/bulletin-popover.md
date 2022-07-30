---
title: 公告
date: 2022-02-05 22:17:55
---

::: tip
公告内容展示在页面右上角，以弹窗的形式展示，该公告的显示和隐藏依赖于 `sesstionStorage` 里的变量，所以网站每次被打开，公告弹窗都会显示。
:::

## 配置

**width**

- 描述：公告宽度，单位 `px`
- 默认值：`300`

**title**

- 描述：公告标题
- 默认值：`公告`

**body**

- 描述：公告内容
- 类型: `{
    type: 'text' | 'hr' | 'title' | 'buttongroup',
    content?: string,
    children?: Array<{ text: string, link: string }> 
  }`
- 类型说明：
  |类型|说明|
  |-|-|
  |title|标题，需要配置 `content` 属性|
  |text|文本，需要配置 `content` 属性|
  |hr|隔断线，类似 `hr` 标签，此类型不需要配置其他属性|
  |buttongroup|按钮组，仅此类型需要配置 `children`|
- 案例：以主题官网为例
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
            content: `🎉🎉🎉 reco 主题 2.x 已经发布 Beta 版本，在发布 Latest 版本之前不会再有大的更新，
            大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
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
              { text: '打赏', link: '/docs/others/donate.html' }
            ]
          }
        ],
      }
    })
  }
  ```


