---
title: Package Manager
date: 2024-04-27
---

If the package manager uses `npm` or `yarn`, only the `package.json` needs to be included:
1. `vuepress`.
2. `vuepress-theme- recovery`.
3. `@ vuepress/bundler- vite` or` @ vuepress/bundler- webpack`.

If the package manager uses `pnpm`, `package.json` also needs to include `vue`.

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
    "vue": "^3.4.27",
    "vuepress": "2.0.0-rc.12",
    "vuepress-theme-reco": "2.0.0-rc.14",
    "@vuepress/bundler-vite": "2.0.0-rc.12",
    "@vuepress/bundler-webpack": "2.0.0-rc.12"
  }
}
```
