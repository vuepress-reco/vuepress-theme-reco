---
title: Register Pages
date: 2024-07-04
---

:::info
You can use `pages` to customize and register some customized pages, such as the Timeline page.
:::

## 注册

Register layouts, please refer to [here](/en/docs/guide/register-layouts.html)。

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
