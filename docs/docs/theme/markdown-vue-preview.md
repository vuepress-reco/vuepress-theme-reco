---
title: Vue 组件预览
date: 2022-01-29
---

:::warning
注意，`2.0.0-rc.5` 之后的版本取消了 `vue-previews` 文件夹的能力，所有组件都可以放在文件夹 `components` 中声明。
:::

:::tip
主题默认将 `/.vuepress/components` 下面的 `.vue` 组件进行了全局注册，所以需要预览的组件请放在此目录下，注意：文件名不允许有 `-` `_`。

如果我们文档项目存放在工程的子目录，比如 `/docs` 文件夹下，我们需要设置 `themeConfig.docsDir` 为 `./docs`。
:::

**输入**

```md
@[preview](@/docs/.vuepress/components/demo.vue)
```

**输出**

@[preview](@/docs/.vuepress/components/demo.vue)
