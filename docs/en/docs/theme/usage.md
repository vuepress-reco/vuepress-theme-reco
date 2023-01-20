---
title: Install And Use
date: 2021-11-06 23:32:42
---

## Install

```bash
npm install vuepress@next vuepress-theme-reco@next --save-dev

# or
yarn add vuepress@next vuepress-theme-reco@next
```

## usage <Badge text="+2.0.0-beta.16" />

:::warning
`vuepress` changed the use of themes from declarative to functional after `2.0-beta.3`, and the reco theme was called in `20.0-beta.16`.
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