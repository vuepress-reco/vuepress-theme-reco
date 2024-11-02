---
title: Social Links
date: 2024-11-03
---

## Types

```ts
type SocialLinks = Array<{
  link: string
  icon: string
}>
```

## Refer

::: tip
For more information on setting icons, please see [Guide-> Icon](/docs/guide/icon.html)
:::

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
      'socialLinks': [
        { icon: 'IconGitHub', link: 'https://github.com/vuepress-reco/vuepress-theme-reco' }
      ]
  })
})
```