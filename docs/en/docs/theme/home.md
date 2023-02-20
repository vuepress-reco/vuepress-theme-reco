---
title: Home Page Path
date: 2023-02-20
---

## Introduction

In some scenarios, the home page of a document is not necessarily the `README.md` file of the document root directory. In this case, you can set `README.md` in `Frontmatter` to top the home page, and specify the home page path through `themeConfig.home`.

## Configuration

:::: code-group
::: code-group-item Specify the home page
```yml
# another-home-path.md
---
title: specifies the home page
home: true
---
```
:::
::: code-group-item Specify the home page path
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