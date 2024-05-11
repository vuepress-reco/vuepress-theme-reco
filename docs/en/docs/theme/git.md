---
title: About Git
date: 2024-02-23
---

## Introduction

:::tip
Used to generate git jump addresses and edit links.

If our project is stored in a subdirectory of the project, such as the `/docs` folder, we need to set `themeConfig.docsDir` to `/docs`.
:::

## Configuration

**repo**
- Type: string
- Details: Specify the repository url of your project. This will be used as the link of the repository link, which will be displayed as the last item of the navbar.

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // If you set it in the form of `organization/repository`
    // we will take it as a GitHub repo
    repo: 'vuejs/vuepress',
    // You can also set it to a URL directly
    repo: 'https://gitlab.com/foo/bar',
  })
})
```

**docsRepo**
- Type: string
- Details: Specify the repository url of your documentation source files. This will be used for generating the edit this page link. If you don't set this option, it will use the repo option by default. But if your documentation source files are in a different repository, you will need to set this option.



**docsBranch**
- Type: string
- Default: 'main'
- Details: Specify the repository branch of your documentation source files. This will be used for generating the edit this page link.

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    docsDir: '/docs',
    docsRepo: 'https://github.com/vuepress-reco/vuepress-theme-reco',
    docsBranch: 'main',
  })
})
```

**docsDir**
- Type: string
- Default: '.'
- Detail: The project is stored in a subdirectory of the project, such as the `/docs` folder, we need to set `themeConfig.docsDir` to `/docs`.Be sure to set it this way, because this configuration is strongly related to many parsing features.
