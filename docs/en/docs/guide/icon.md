---
title: Icon
date: 2023-01-23
---

## Introduction

:::warning
Originally, the reco theme's icons only integrated one type of icon [Carbon](https://carbondesignsystem.com/elements/icons/library/). Due to limited customization capabilities, after the ` 2.0.0-rc.23` version, the reco theme no longer has built-in icons, but allows users to customize any icon they want.

:::

## Usage

### Registrater icon component

Register icon components under `.vuepress/components`, such as adding an `IconHome.vue`:

> svg 可以去 [Xicons](https://www.xicons.org/#/zh-CN) 获取，其他 svg 资源均可。

```vue
<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15L31 13.428zM18 26h-4v-8h4zm2 0v-8a2.002 2.002 0 0 0-2-2h-4a2.002 2.002 0 0 0-2 2v8H6V12.062l10-7.79l10 7.8V26z" fill="currentColor"></path></svg>
</template>
```

### 使用图标组件

:::: code-group
::: code-group-item Using in config file
```ts
import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: recoTheme({
    navbar: { text: 'Home', link: '/', icon: 'IconHome' }
  })
})
```
:::
::: code-group-item Use in mackdown
```markdown
<Xicons icon="IconHome" />
```
:::
::::


## Advanced

If you want to use the svg icon directly in a custom component or markdown:

```vue
<Xicons :text="copyRight">
  <template #icon>
    <svg class="xicon-icon" style="width: 18px; height: 18px; font-size: 18px; color: inherit;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M14 9.75a3.016 3.016 0 0 0-4.163.173a2.993 2.993 0 0 0 0 4.154A3.016 3.016 0 0 0 14 14.25"></path></g></svg>
  </template>
</Xicons>
```

## Reference

### Props

|Params|Description|Type|Optional|Default|
|-|-|-|-|-|
|icon|Icon|string|The Name of customed icon component|-|
|color|Color of icon and text|string|-|inherit|
|iconPosition|The position of icon, this makes sense when both icon and text are set|string|top/bottom/left/right|left|
|iconSize|The size of icon|string|-|18|
|text|The content of text|string|-|-|
|textSize|The size of text|string|-|14|
|link|Jump link|string|-|javascript:void(0)|
|target|Jump method|string|_self/_blank/_parent/_top|_self|


### Slots

|Name|Description|
|-|-|
|default|Specify the contents of the props.text position to express more complex content|
|icon|Replace with an external icon|
