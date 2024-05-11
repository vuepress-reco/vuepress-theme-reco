---
title: Auto Set Series
date: 2023-02-17
---

## Introduction

In order to save users' time cost, the theme can automatically generate a series of configurations for the documents under the `series` folder according to the folder nesting relationship.

```
/
└─ .vuepress
└─ series
  └─ sery 1
    └─ doc1.md
    └─ doc2.md
  └─ sery 2
    └─ group1
      └─ doc3.md
    └─ group2
      └─ doc4.md
```

## Configure

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // auto set series
    autoSetSeries: true,
  })
})
```