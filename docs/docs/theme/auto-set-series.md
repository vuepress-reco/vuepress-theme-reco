---
title: 自动设置系列
date: 2023-02-17
---

## 介绍

为了节约用户的时间成本，主题可以自动将 `series` 文件夹下的文档，按照文件夹嵌套关系生成系列的配置。
```

/
└─ .vuepress
└─ series
  └─ 系列1
    └─ 文档1.md
    └─ 文档2.md
  └─ 系列2
    └─ 分组1
      └─ 文档3.md
    └─ 分组2
      └─ 文档4.md
```

## 配置

```ts
import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    // 自动设置分类
    autoSetSeries: true,
  })
})
```