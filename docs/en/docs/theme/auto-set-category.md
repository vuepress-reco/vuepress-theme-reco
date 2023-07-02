---
title: Auto Set Categories
date: 2021-12-12 17:58:24
---

## Introduction

In order to save users' time cost, the theme can automatically set the classification for the blog under the `blogs` folder, that is, set the name of the folder where the file is located to the value of the `categories` of the file's `frontmatter`.

```
/
└─ .vuepress
└─ blogs
  └─ Category 1
    └─ blog1.md
  └─ Category 2
    └─ blog2.md
```

## Configure

::: warning
The `autoAddCategoryToNavbar` API will be adjusted later, but will not be abandoned, please use it with caution.
:::

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // automatically set categories
    autoSetBlogCategories: true,
    // automatically add categories and tags to the header navigation bar
    autoAddCategoryToNavbar: {
      location: 1, // default 0
      categoryText: '分类', // default categories
      tagText: '标签' // default tags
    },
    // when autoAddCategoryToNavbar is true, all defaults are taken.
    autoAddCategoryToNavbar: true
  })
})
```