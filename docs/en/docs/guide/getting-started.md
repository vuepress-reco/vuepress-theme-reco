---
title: Quick start
date: 2021-11-05 00:34:35
---

## Quick Start

**npx**

```bash
# Init，and choose 2.x
npx @vuepress-reco/theme-cli init
```

**npm**

```bash
# Init，and choose 2.x
npm install @vuepress-reco/theme-cli@1.0.7 -g
theme-cli init
```

**yarn**

```bash
# Init，and choose 2.x
yarn global add @vuepress-reco/theme-cli@1.0.7
theme-cli init
```

## Manual Installation

```bash
npm install vuepress@next vuepress-theme-reco@next --save-dev

# or
yarn add vuepress@next vuepress-theme-reco@next
```

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // options
  })
})
```
