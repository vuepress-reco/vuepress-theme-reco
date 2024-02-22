---
title: 源文件文件夹
date: 2024-02-23
---


## 介绍

:::tip
如果我们文档项目存放在工程的子目录，比如 `/docs` 文件夹下，我们需要设置 `themeConfig.sourceDir` 为 `./docs`。
:::

## 配置

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    sourceDir: '/docs'
  })
})
```
