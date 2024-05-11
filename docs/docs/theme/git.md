---
title: git 相关
date: 2024-02-23
---


## 介绍

:::tip
用于生成 git 跳转地址和编辑链接。

如果我们文档项目存放在工程的子目录，比如 `/docs` 文件夹下，我们需要设置 `themeConfig.docsDir` 为 `./docs`。
:::

## 配置

**repo**
- 类型： string
- 详情：项目仓库的 URL。它将被用作 仓库链接 的链接。仓库链接 将会显示为导航栏的最后一个元素。


```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // 如果你按照 `organization/repository` 的格式设置它
    // 我们会将它作为一个 GitHub 仓库
    repo: 'vuejs/vuepress',
    // 你也可以直接将它设置为一个 URL
    repo: 'https://gitlab.com/foo/bar',
  })
})
```

**docsRepo**
- 类型： string
- 详情：文档源文件的仓库 URL 。它将会用于生成 编辑此页 的链接。如果你不设置该选项，则默认会使用 repo 配置项。但是如果你的文档源文件是在一个不同的仓库内，你就需要设置该配置项了。

**docsBranch**
- 类型： string
- 默认值： 'main'
- 详情：文档源文件的仓库分支。它将会用于生成 编辑此页 的链接。

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
- 类型： string
- 详情：文档项目存放在工程的子目录。如果我们文档项目存放在工程的子目录，比如 /docs 文件夹下，我们需要设置 themeConfig.docsDir 为 ./docs。务必要这样设置，因为这项配置与很多解析功能强相关。
