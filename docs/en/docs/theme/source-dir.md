---
title: Source folder
date: 2024-02-23
---


## Introduction

:::tip
If our project is stored in a subdirectory of the project, such as the `/docs` folder, we need to set `themeConfig.docsDir` to `/docs`.

Be sure to set it this way, because this configuration is strongly related to many parsing features.
:::

## Configuration

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
