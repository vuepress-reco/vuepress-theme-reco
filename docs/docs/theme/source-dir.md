---
title: 源文件文件夹
date: 2024-02-23
---


## 介绍

:::warning
如果我们文档项目存放在工程的子目录，比如 `/docs` 文件夹下，我们需要设置 `themeConfig.docsDir` 为 `./docs`。

务必要这样设置，因为这项配置与很多解析功能强相关。
:::

## 配置

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    docsDir: '/docs'
  })
})
```
