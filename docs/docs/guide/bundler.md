---
title: 打包工具
date: 2024-04-20
---

## 使用打包工具

一般情况下，你不要任何额外配置就可以使用打包工具，因为我们已经帮你配置好了它们。你只需要通过 `bundler` 配置项指定打包工具即可：

```ts
import { viteBundler } from '@vuepress/bundler-vite'
// import { webpackBundler } from '@vuepress/bundler-webpack'

export default {
  bundler: viteBundler(),
  // bundler: webpackBundler(),
}
```

## 配置

:::warning
因为 `reco` 主题自改写了打包工具的默认配置，所以如果用户想要自定义打包工具的配置，需要借助 `theme.viteBundlerOptions` 或 `theme.webpackBundlerOptions`，原来的 `viteBundler({})` 和 `webpackBundler({})` 已无法生效。
:::

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'
import { viteBundler } from '@vuepress/bundler-vite'
// import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  bundler: viteBundler(),
  // bundler: webpackBundler(),
  theme: recoTheme({
    viteBundlerOptions: {
      viteOptions: {},
      vuePluginOptions: {},
    },
    // webpackBundlerOptions: {
    //   postcss: {},
    //   vue: {}
    // }
  })
})
```