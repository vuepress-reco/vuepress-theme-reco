---
title: 系列
date: 2021-11-06 23:36:01
---

在 `vuepress-theme-reco@2.x` 中，`左侧边栏（sideBar）` 被更改为 `系列（series）`，由两部分原因：

1. 在 `vuepress-theme-reco@1.x` 中，侧边栏被拆分为了 `左侧边栏（sidebar）` 和 `右侧边栏（subSidebar）`，多个文档可以通过左侧边栏来聚合在一起，表达它们之间的联系，右侧边栏展示的则是当前页面的目录结构，因为考虑到 `vuepress` 默认主题将他们都放在左侧侧边栏会将其表现的没有重点，但是通过 `sidebar` 和 `subSidebar` 来表示 `左侧边栏` 和 `右侧边栏`，语意化又不太好；
2. 考虑到需要放在一起的文档一定是一个 “系列” 文档，比如教程、文集等，故采用了 `series`。

## 配置

**普通**

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    series: {
      '/vuepress-theme-reco/': [ 'introduce', 'usage' ]
    }
  }
}
```

**分组**

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    series: {
      '/vuepress-theme-reco/': [
        {
          text: '基础',
          children: [ 'introduce', 'usage' ]
          collapsible: true // 默认展开，true 为折叠
        },
        {
          text: '高级',
          children: [ 'home', 'series', 'comments' ]
        }
      ]
    }
  }
}
```

**异常**

::: warning
如果左侧出现文章的名称显示成了文档的路径，可以把 children 变为完整模式。
:::

```js
// 省略模式
module.exports = {
  themeConfig: {
    series: {
      '/vuepress-theme-reco/': [ 'introduce', 'usage' ]
    }
  }
}

// 完整模式
module.exports = {
  themeConfig: {
    series: {
      '/vuepress-theme-reco/': [ '/vuepress-theme-reco/introduce', '/vuepress-theme-reco/usage' ]
    }
  }
}
```
