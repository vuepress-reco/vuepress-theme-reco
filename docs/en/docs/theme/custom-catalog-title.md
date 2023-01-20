---
title: Custom Catalog Title
date: 2022-06-07 22:30:37
---

Use `catalogTitle` to set the title of the catalog to the right of the article.

## Configure

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    catalogTitle: 'custom directory title'
  })
})
```