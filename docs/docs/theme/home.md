---
title: 首页路径
date: 2023-02-20
---

## 介绍

某些场景下，文档的首页并不一定是文档根目录的 `README.md` 文件，这时我们可以在 `Frontmatter` 中设置 `home: true` 来置顶首页，并通过 `themeConfig.home` 来指定首页路径。

## 配置

:::: code-group
::: code-group-item 指定首页
```yml
# another-home-path.md
---
title: 指定首页
home: true
---
```
:::
::: code-group-item 指定首页路径
```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    home: '/another-home-path'
  })
})
```
:::
::::