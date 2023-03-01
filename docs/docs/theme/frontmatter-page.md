---
title: 普通文档
date: 2023-02-12
---

:::tip
以下为 `vuepress-theme-reco` 特有的 `Frontmatter` 配置，其他配置请参考 [Vuepress Frontmatter](https://v2.vuepress.vuejs.org/zh/reference/frontmatter.html)。
:::

## password

- 类型：`string ｜ string[]`
- 详情：页面加密密码。
- 参考：[参考 -> 主题配置 -> 加密](/docs/theme/password.html)

## sticky

- 类型：`number`
- 详情：文章置顶，按照 1, 2, 3, ... 来降序排序。

## pageClass

- 类型： `string`
- 详情：为当前页面添加额外的类名。
- 示例：
  ```md
    ---
    pageClass: custom-page-class
    ---
  ```

  然后你可以在 `.vuepress/styles/index.css` 文件中为这个页面添加自定义样式：

  ```css
  .theme-container {
    .custom-page-class {
      /* 页面样式 */
    }
  }
  ```

- 参考：[默认主题 > 样式 > Style 文件](/docs/theme/custom-style.html)

