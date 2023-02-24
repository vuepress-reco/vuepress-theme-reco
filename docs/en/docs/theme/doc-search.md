---
title: Search Function
date: 2023-02-24
---

## Introduction

The theme already has a simple search capability built in. If you want to use `Algolia`, you can configure it.

## Configure

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
