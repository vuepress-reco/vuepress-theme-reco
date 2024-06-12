---
title: 外观
date: 2023-02-14
---

## 介绍

主题默认根据系统的外观颜色来自动改变自己的外观颜色，但是允许用户设置默认外观颜色，可选值为 `dark`、`light`、`auto`，默认 `auto`。

## 使用

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    colorMode: 'dark', // dark, light, 默认 auto
    colorModeSwitch: false // 是否展示颜色模式开关，默认 true
  })
})
```