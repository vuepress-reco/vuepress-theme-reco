---
title: 用户自定义配置打包
date: 2022-08-21 17:58:24
---

::: tip
我们默认配置了 postcss 的 plugins ，这是保证项目启动的基本配置。
:::

如果你不满意我们现有的打包或者想要自定义打包配置，你可以使用该功能，该配置为 vuepress@2.x 提供的基于 Vite 的打包配置，[详情参考](https://v2.vuepress.vuejs.org/reference/bundler/vite.html)，

## 配置

### viteBundler

- 描述：自定义打包配置
- 配置项：
  - viteOptions：接受 Vite 的所有选项。
  - vuePluginOptions： 接受 [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue) 的所有选项


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