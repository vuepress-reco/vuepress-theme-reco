---
title: 注册页面
date: 2024-07-04
---

:::info
可以通过 `pages` 来自定义注册一些定制化的页面，比如时间轴页面。
:::

## 注册

注册布局，请参考 [这里](/docs/guide/register-layouts.html)。

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    pages: [
      {
        path: '/custom-page.html',
        layout: 'CustomLayout',
      },
    ]
  })
})
```
