---
title: Customize Primary Color
date: 2023-01-21 01:00:00
---

::: warning
The theme configures css through `tailwindcss`, more configuration capabilities may be opened later, so the API of the current functionality may change later.
:::

If you don't like the theme's default primary color, you can customize it by `themeConfig.primaryColor` :

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    primaryColor: '#3aa675'
  })
})
```