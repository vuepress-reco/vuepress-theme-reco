---
title: 注册组件
date: 2022-04-27 00:56:21
---

::: warning
reco 主题的 css 方案是 postcss + tailwindcss，支持 css 最新嵌套提案（类 scss），为组件书写样式时需注意。
:::

主题默认将 `/.vuepress/components` 下面的 `.vue` 组件进行了全局注册，所以需要预览的组件请放在此目录下。

如果我们文档项目存放在工程的子目录，比如 `/doc` 文件夹下，我们需要设置 `themeConfig.componentsDir` 为 `./docs/.vuepress/components`。
