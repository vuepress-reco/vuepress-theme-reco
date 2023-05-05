---
title: Series
date: 2021-11-06 23:36:01
---

In `vuepress-theme-reco@2.x`, `sidebar` was changed to `series` for two reasons:

1. In `vuepress-theme-reco@1.x`, the sidebar is split into `left sidebar' and `right sidebar', multiple documents can be aggregated in the left sidebar Together, to express the connection between them, the right sidebar shows the directory structure of the current page, because considering the `vuepress` default theme, putting them all on the left sidebar will make it unfocused, but by `sidebar` and `subSidebar` to represent `left sidebar` and `right sidebar`, the semantics are not very good;
2. Considering that the documents that need to be put together must be a "series" of documents, such as tutorials, anthologies, etc., `series` is used.

## Configure

**general**

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

**group**

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    series: {
      '/vuepress-theme-reco/': [
        {
          text: 'base',
          children: [ 'introduce', 'usage' ],
          collapsible: true // expand by default, true is collapsible
        },
        {
          text: 'advanced',
          children: [ 'home', 'series', 'comments' ]
        }
      ]
    }
  }
}
```

**error**

::: warning
If the name of the article on the left shows the path to the document, you can turn children into full mode.
:::

```js
// omit mode
module.exports = {
  themeConfig: {
    series: {
      '/vuepress-theme-reco/': [ 'introduce', 'usage' ]
    }
  }
}

// full mode
module.exports = {
  themeConfig: {
    series: {
      '/vuepress-theme-reco/': [ '/vuepress-theme-reco/introduce', '/vuepress-theme-reco/usage' ]
    }
  }
}
```
