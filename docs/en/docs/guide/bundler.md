---
title: Bundler
date: 2024-04-20
---

## Use a Bundler

Generally, you could use a bundler without extra configuration, because we have already configured them properly to work with VuePress. You can use a bundler via the bundler option:

```ts
import { viteBundler } from '@vuepress/bundler-vite'
// import { webpackBundler } from '@vuepress/bundler-webpack'

export default {
  bundler: viteBundler(),
  // bundler: webpackBundler(),
}
```

## Options

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