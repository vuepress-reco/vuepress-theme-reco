---
title: 社交地址 
date: 2024-11-03
---

## 类型

```ts
type SocialLinks = Array<{
  link: string
  icon: string
}>
```

## 案例

::: tip
设置图标请参考 [指南 -> 图标](/docs/guide/icon.html)
:::

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
      'socialLinks': [
        { icon: 'IconGitHub', link: 'https://github.com/vuepress-reco/vuepress-theme-reco' }
      ]
  })
})
```
