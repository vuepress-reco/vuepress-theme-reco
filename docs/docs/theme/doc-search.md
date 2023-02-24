---
title: 搜索功能
date: 2023-02-24
---

## 介绍

主题已经内置了简单的搜索能力，如果希望使用 `Algolia`，可以进行配置。

## 配置

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
  algolia: {
    appId: 'xxx',
    apiKey: 'xxx',
    indexName: 'xxx',
    inputSelector: '### REPLACE ME ####',
    algoliaOptions: { 'facetFilters': ["lang:$LANG"] },
    debug: false // Set debug to true if you want to inspect the dropdown
  },
  })
})
```
