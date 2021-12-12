---
title: 自动设置分类
date: 2021-12-12 17:58:24
---

为了节约用户的时间成本，主题允许自动添加分类功能，可以向指定文件夹（blogs 和 docs）的 markdown 文件的 frontmatter 设置 categories。

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