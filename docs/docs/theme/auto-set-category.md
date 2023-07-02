---
title: 自动设置分类
date: 2021-12-12 17:58:24
---

## 介绍

为了节约用户的时间成本，主题可以自动为 `blogs` 文件夹下的博客设置分类，也就是将该文件所在文件夹的名称设置为该文件的 `frontmatter` 的 `categories` 的值。

```
/
└─ .vuepress
└─ blogs
  └─ 分类1
    └─ 博客1.md
  └─ 分类2
    └─ 博客2.md
```

## 配置

::: warning
`autoAddCategoryToNavbar` API 后期会做调整，但不会废弃，请谨慎使用。
:::

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // 自动设置分类
    autoSetBlogCategories: true,
    // 自动将分类和标签添加至头部导航条
    autoAddCategoryToNavbar: {
      location: 1, // 默认 0
      categoryText: '分类', // 默认 categories
      tagText: '标签' // 默认 tags
    },
    // 当 autoAddCategoryToNavbar 为 true 时，则全部取默认值
    autoAddCategoryToNavbar: true
  })
})
```