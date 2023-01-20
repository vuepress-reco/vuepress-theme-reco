---
title: 自定义主题的基础色
date: 2023-01-21 01:00:00
---

::: warning
主题是通过 `tailwindcss` 来配置 css 的，后期可能会开放更多的配置能力，所以当前功能的 API 在以后可能会改变。
:::

如果你对主题的默认的主色不喜欢，可以通过 `themeConfig.primaryColor` 来自定义，主题会修改 `tailwindcss` 的配置：

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    primaryColor: '#3aa675'
  })
})
```