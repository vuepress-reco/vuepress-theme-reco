---
title: 注册布局
date: 2024-07-04
---

::: warning
- 书写样式请参考 [指南/样式](/docs/guide/style)。
- 如果我们文档项目存放在工程的子目录，比如 `/docs` 文件夹下，我们需要设置 `themeConfig.docsDir` 为 `/docs`。
:::

## 介绍

主题默认将 `/.vuepress/layouts` 下面的 `.vue` 组件注册为布局组件，如果组件的名字与主题内置的组件名字一样，则会覆盖默认布局。

## 指定某个页面的布局

```md
---
layout: CustomLayout
---
```

## 开发

**通用容器**

请使用 `GenericContainer` 作为布局组件的外层容器，这样会为自定义的布局添加顶部导航、侧边栏等能力。

**别名**

可以通过这些别名直接引入需要的内置能力。

```ts
alias: {
  '@types': path.resolve(__dirname, '../types'),
  '@client': path.resolve(__dirname, '../client'),
  '@utils': path.resolve(__dirname, '../client/utils'),
  '@components': path.resolve(__dirname, '../client/components'),
  '@composables': path.resolve(__dirname, '../client/composables'),
},
```

**样式**

请参考 [这里](/docs/guide/style.html)。

**案例**

```vue
<template>
  <GenericContainer>
    <section class="page-404-wrapper">
      <div class="content">
        <h1>404</h1>
        <p>Oops! Page does not exist.</p>
        <div class="xicon-container">Go Home</div>
      </div>
    </section>
  </GenericContainer>
</template>

<script lang="ts" setup>
import GenericContainer from '@components/GenericContainer/index.vue'
import { useThemeLocaleData } from '@composables/index.js'
</script>

<style lang="postcss">
.page-404-wrapper {
  @apply bg-reco-primary;
}
</style>
```
