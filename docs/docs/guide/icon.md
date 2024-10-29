---
title: 图标
date: 2023-01-23
---

## 介绍

:::warning
原来 reco 主题的图标只集成了 [Carbon](https://carbondesignsystem.com/elements/icons/library/) 1 种图标，因为定制能力受限，`2.0.0-rc.23` 版本之后，reco 主题不再内置图标，而是允许用户定制任何自己想要的图标。
:::

## 使用

### 注册图标组件

在 `.vuepress/components` 下注册图标组件，比如新增一个 `IconHome.vue`：

> svg 可以去 [Xicons](https://www.xicons.org/#/zh-CN) 获取，其他 svg 资源均可。

```vue
<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15L31 13.428zM18 26h-4v-8h4zm2 0v-8a2.002 2.002 0 0 0-2-2h-4a2.002 2.002 0 0 0-2 2v8H6V12.062l10-7.79l10 7.8V26z" fill="currentColor"></path></svg>
</template>
```

### 使用图标组件

:::: code-group
::: code-group-item 在 config 文件中使用
```ts
import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: recoTheme({
    navbar: { text: '首页', link: '/', icon: 'IconHome' }
  })
})
```
:::
::: code-group-item 在 mackdown 中使用
```markdown
<Xicons icon="IconHome" />
```
:::
::::


## 高级

如果想要在自定义组件或 markdown 中直接使用 svg 图标：

```vue
<Xicons :text="copyRight">
  <template #icon>
    <svg class="xicon-icon" style="width: 18px; height: 18px; font-size: 18px; color: inherit;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M14 9.75a3.016 3.016 0 0 0-4.163.173a2.993 2.993 0 0 0 0 4.154A3.016 3.016 0 0 0 14 14.25"></path></g></svg>
  </template>
</Xicons>
```

## 参考

### Props

|参数|说明|类型|可选值|默认值|
|-|-|-|-|-|
|icon|图标|string|自定义的图标组件名称|-|
|color|图标和文本的颜色|string|-|inherit|
|iconPosition|图标的位置，同时设置了 icon 和 text 时才有意义|string|top/bottom/left/right|left|
|iconSize|图标的大小|string|-|18|
|text|文本的内容|string|-|-|
|textSize|文本的大小|string|-|14|
|link|跳转链接|string|-|javascript:void(0)|
|target|跳转方式|string|`_self`,`_blank`,`_parent`,`_top`|_self|

### Slots

|name|说明|
|-|-|
|default|指定 props.text 位置的内容，用于表达更加复杂的内容|
|icon|通过外部图标来替换|
