---
title: 自定义目录标题
date: 2022-06-07 22:30:37
---

通过 `catalogTitle` 设置文章右侧目录的标题。

## 配置

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    catalogTitle: '自定义目录标题'
  })
})
```