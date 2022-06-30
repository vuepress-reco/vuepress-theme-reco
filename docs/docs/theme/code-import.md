---
title: 代码引入
date: 2022-01-29 16:24:23
---

## 单文件导入

**输入**

```md
@[code](../../.vuepress/vue-previews/demo.vue)
```

**输出**

@[code](../../.vuepress/vue-previews/demo.vue)

## vue 组件导入

:::tip
主题默认将 `/.vuepress/vue-previews` 下面的 `.vue` 组件进行了全局注册，所以需要预览的组件请放在此目录下。

如果我们文档项目存放在工程的子目录，比如 `/doc` 文件夹下，我们需要设置 `themeConfig.vuePreviewsDir` 为 `./docs/.vuepress/vue-previews`。
:::

### vue 组件预览

**输入**

```md
@[preview-demo](@/docs/.vuepress/vue-previews/demo.vue)
```

**输出**

@[preview-demo](@/docs/.vuepress/vue-previews/demo.vue)

### vue 组仅展示代码组

**输入**

```md
@[preview](@/docs/.vuepress/vue-previews/demo.vue)
```

**输出**

@[preview](@/docs/.vuepress/vue-previews/demo.vue)
