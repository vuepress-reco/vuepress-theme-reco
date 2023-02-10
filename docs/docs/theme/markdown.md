---
title: Markdown 扩展
date: 2022-01-29 16:24:23
---

`vuepress-theme-reco` 在 `vuepress` 原有能力的基础上扩展了以下能力。

## 任务列表

**输入**

```md
- [x] 打游戏
- [ ] 学习
```

**输出**

- [x] 打游戏
- [ ] 学习

## Vue 组件预览

:::tip
主题默认将 `/.vuepress/vue-previews` 下面的 `.vue` 组件进行了全局注册，所以需要预览的组件请放在此目录下，注意：文件名不允许有 `-` `_`。

如果我们文档项目存放在工程的子目录，比如 `/docs` 文件夹下，我们需要设置 `themeConfig.vuePreviewsDir` 为 `./docs/.vuepress/vue-previews`。
:::

**输入**

```md
@[preview](@/docs/.vuepress/vue-previews/demo.vue)
```

**输出**

@[preview](@/docs/.vuepress/vue-previews/demo.vue)

## 文件解析代码组

**输入**

```md
@[code-group](@/docs/.vuepress/vue-previews/demo.vue)
```

**输出**

@[code-group](@/docs/.vuepress/vue-previews/demo.vue)
