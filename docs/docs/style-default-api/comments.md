---
title: 评论
date: 2021-11-06 23:41:31
---

## 介绍

主题内置评论插件 `@vuepress-reco/vuepress-plugin-comments`，目前仅支持 `Valine`，因为 `Vssue` 还没有适配 `Vue3`；

如果你想默认不加载评论，而只在某些页面显示评论功能，可以在 `valineConfig` 中设置 `hideComments: true`，并在需要展示评论的页面设置 `hideComments: false`。

如果仅是某篇文章不想设置开启评论功能，可以在 `front-matter` 设置 `hideComments: true`。

## Option API

### Valine

```javascript
module.exports = {
  theme: 'reco',
  themeConfig: {
    valineConfig: {
      appId: '...',// your appId
      appKey: '...', // your appKey
      hideComments: true, // 全局隐藏评论，默认 false
    }
  }  
}
```

其他参数参考 [Valine 官网](https://valine.js.org/configuration.html)。

::: tip
如果 valine 的获取评论的接口报 `404` 错误的话，不用担心，这是因为你还没有添加评论，只要存在1条评论，就不会报错了，这是 `leanCloud` 的请求处理操作而已；
:::
