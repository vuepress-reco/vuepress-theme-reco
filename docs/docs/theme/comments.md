---
title: 评论
date: 2021-11-06 23:41:31
---

## 介绍

主题内置评论插件 `@vuepress-reco/vuepress-plugin-comments`，目前支持 `Valine、Waline、Giscus`；

如果你想默认不加载评论，而只在某些页面显示评论功能，可以在 `commentConfig.options` 中设置 `hideComments: true`，并在需要展示评论的页面设置 `hideComments: false`。

如果仅是某篇文章不想设置开启评论功能，可以在 `front-matter` 设置 `hideComments: true`。

## Option API

### Valine

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    commentConfig: {
      type: 'valine',
      options: {
        appId: '...', // your appId
        appKey: '...', // your appKey
        hideComments: true, // 全局隐藏评论，默认 false
      },
    },
  }),
})
```

其他参数参考 [Valine 官网](https://valine.js.org/configuration.html)。

::: tip
如果 valine 的获取评论的接口报 `404` 错误的话，不用担心，这是因为你还没有添加评论，只要存在 1 条评论，就不会报错了，这是 `leanCloud` 的请求处理操作而已；
:::

### Waline

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    commentConfig: {
      type: 'waline',
      options: {
        serverURL: 'your serverURL',
        ...
        hideComments: true, // 全局隐藏评论，默认 false
      },
    },
  }),
})
```

使用教程及 options 其它参数参考 [Waline 官网](https://waline.js.org/guide/get-started.html)。

### Giscus

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
    commentConfig: {
      type: 'giscus',
      options: {
        repo: 'reco/blog-comments',
        repoId: 'R_kgDOxxxxxx',
        category: 'Announcements',
        categoryId: 'xxxxx',
        mapping: 'title',
        ...
        hideComments: true, // 全局隐藏评论，默认 false
      },
    },
  }),
})
```

使用教程及 options 其它参数参考[Giscus](https://giscus.app)。

::: warning
Giscus 会在页面内放置指向 giscus.app 的 iframe，而该组件需要加载网站中的 css 文件才能使用配置文件中的主题，这会造成跨域问题。在使用开发服务器问题时，该问题无需处理；在正式部署时，需要配置 `Access-Control-Allow-Origin` 和 `Access-Control-Allow-Headers` 请求头，否则评论样式会出现问题。
:::
