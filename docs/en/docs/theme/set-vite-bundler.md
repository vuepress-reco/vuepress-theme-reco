---
title: User-defined packaging configuration
date: 2022-08-21 17:58:24
---

::: tip
We configure postcss plugins by default, which is the basic configuration to ensure project startup.
:::

If you are not satisfied with our existing packaging or want to customize the packaging configuration, you can use this function, which is the Vite-based packaging configuration provided by vuepress@2.x, [check the details](https://v2.vuepress.vuejs.org/reference/bundler/vite.html)，

## Configure

### viteBundler

- description: User-defined packaging configuration
- Options:
  - viteOptions: Accepts all options of Vite.
  - vuePluginOptions： Accepts all options of [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue).


```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    viteBundler: {
      viteOptions: {
        ...do somthing
      },
      vuePluginOptions: {
        ...do somthing
      }
    }
  })
})
```