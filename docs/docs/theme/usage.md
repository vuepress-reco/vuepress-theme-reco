---
title: 安装和使用
date: 2021-11-06 23:32:42
---

## 安装

```bash
npm install vuepress@next vuepress-theme-reco@next --save-dev

# or
yarn add vuepress@next vuepress-theme-reco@next
```

## 使用 <Badge text="+2.0.0-beta.16" />

:::warning
`vuepress` 在 `2.0.0-beta.39` 版本之后，将主题的使用从声明式改为函数式，reco 主题在 `2.0.0-beta.16` 进行了适配。
:::

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // options
  })
})
```