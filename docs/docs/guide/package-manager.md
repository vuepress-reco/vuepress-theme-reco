---
title: 包管理工具
date: 2024-04-27
---

如果包管理器使用的是 `npm` 或 `yarn`，`package.json` 中只需要包含：
1. `vuepress`
2. `vuepress-theme-reco`
3. `@vuepress/bundler-vite` 或 `@vuepress/bundler-webpack`

如果包管理器使用的是 `pnpm`，`package.json` 中还需要包含 `vue`。

```json
{
  "name": "vuepress-theme-reco-demo",
  "version": "2.0.0",
  "description": "Demo for vuepress-theme-reco@2.x.",
  "repository": "git@github.com:recoluan/vuepress-theme-reco-demo.git",
  "author": "reco_luan <recoluan@outlook.com>",
  "license": "MIT",
  "scripts": {
    "dev": "vuepress dev .",
    "start": "vuepress dev .",
    "build": "vuepress build ."
  },
  "dependencies": {
    "vue": "^3.4.29",
    "vuepress": "2.0.0-rc.14",
    "vuepress-theme-reco": "2.0.0-rc.16",
    "@vuepress/bundler-vite": "2.0.0-rc.14",
    "@vuepress/bundler-webpack": "2.0.0-rc.14"
  }
}
```
