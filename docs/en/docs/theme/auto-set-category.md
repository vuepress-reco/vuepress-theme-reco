---
title: Automatically set categories
date: 2021-12-12 17:58:24
---

In order to save the user's time and cost, the theme can be set to automatically set the category for the `markdown` file, that is, the name of the folder where the file is located is set to the value of the `categories` of the `frontmatter` of the file, but only for the `blogs` and `docs` files in the document root directory The `markdown` files in the folder are valid.

```
.
└─ .vuepress
└─ blogs
  └─ Category 1
  └─ Category 2
└─ docs
  └─ Category 3
  └─ Category 4
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
    autoSetBlogCategories: true,         // automatically set categories
    autoAddCategoryToNavbar: true  // automatically add homepage, categories and tags to the header navigation bar
  })
})
```