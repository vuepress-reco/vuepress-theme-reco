---
title: 语言配置
date: 2022-06-07 22:30:37
---

这些选项用于配置与语言相关的文本。

如果你的站点是以英语以外的其他语言提供服务的，你应该为每个语言设置这些选项来提供翻译。

## 配置

|参数|类型|默认值|描述|
|-|-|-|-|
|categoriesText|`string`|Categories|分类|
|tagsText|`string`|Tags|标签|
|catalogTitle|`string`|ON THIS PAGE|文章右侧目录的标题|
|selectLanguageText|`string`|Languages|选择语言菜单 的文字|
|selectLanguageName|`string`|${lang}|Locale 的语言名称|
|editLinkText|`string`|Edit this page|编辑此页 链接的文字|
|lastUpdatedText|`string`|Last Updated|最近更新时间戳 标签的文字|
|tip|`string`|TIP|自定义提示容器的标题|
|info|`string`|INFO|自定义信息容器的标题|
|warning|`string`|WARNING|自定义警告容器的标题|
|danger|`string`|DANGER|自定义危险容器的标题|
|details|`string`|DETAILS|自定义详情容器的标题|
|notFound|`string`|Oops! Page does not exist.|404 页面文案|
|backToHome|`string`|Back To Home|404 页面返回首页文案|

## 案例

```ts
// .vuepress/config.ts

import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  theme: recoTheme({
      tip: '提示',
      info: '信息',
      danger: '危险',
      warning: '警告',
      details: '详情',
      tagsText: '标签',
      backToHome: '返回首页',
      categoriesText: '分类',
      catalogTitle: '页面导航',
      selectLanguageText: '语言',
      editLinkText: '编辑当前页面',
      lastUpdatedText: '最后更新时间',
      selectLanguageName: '简体中文',
      notFound: '哇哦，没有发现这个页面！',
  })
})
```
