---
title: 自动设置分类
date: 2021-12-12 17:58:24
---

为了节约用户的时间成本，主题可以设置自动为 markdown 文件设置分类，也就是将该文件所在文件夹的名称设置为该文件的 frontmatter 的 categories 的值，但是仅对文档根目录下的 blogs 和 docs 文件夹里的 markdown 文件有效。

```
.
└─ .vuepress
└─ blogs
  └─ 分类1
  └─ 分类2
└─ docs
  └─ 分类1
  └─ 分类4
```

## 配置

::: warning
`autoAddCategoryToNavbar` API 后期会做调整，但不会废弃，请谨慎使用。
:::

```ts
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  theme: 'reco',
  themeConfig: {
    style: '@vuepress-reco/style-default',
    autoSetCategory: true,         // 自动设置分类
    autoAddCategoryToNavbar: true  // 自动将首页、分类和标签添加至头部导航条
  }
})
```