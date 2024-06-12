---
title: Appearance
date: 2023-02-14
---

## Introduction

The theme automatically changes its appearance color according to the appearance color of the system by default, but allows users to set the default appearance color. Available values are `dark`, `light`, `auto`, default `auto`.

## Usage

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    colorMode: 'dark', // dark, light, default auto
    colorModeSwitch: false // if show color mode switch，default true
  })
})
```