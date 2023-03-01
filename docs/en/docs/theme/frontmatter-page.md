---
title: Normal Pages
date: 2023-02-12
---

:::tip
The following is the `Frontmatter` configuration unique to `vuepress-theme- reco`. For other configurations, please refer to [Vuepress Frontmatter](https://v2.vuepress.vuejs.org/zh/reference/frontmatter.html)。
:::

## password

- Type: `string ｜ string[]`
- Detail: page encryption password.
- Refer: [Reference->Theme Configuration-> Encryption](/en/docs/theme/password.html)

## sticky

- Type: `number`
- Detail: The article is on top, according to 1, 2, 3,. To sort in descending order.


## pageClass

- Type: `string`
- Detail: 为当前页面添加额外的类名。
- Example:
  ```md
    ---
    pageClass: custom-page-class
    ---
  ```

  Then you can customize styles of this page in `.vuepress/styles/index.css` file:

  ```css
  .theme-container {
    .custom-page-class {
      /* page styles */
    }
  }
  ```

- Also see: [Default Theme > Styles > Style File](/en/docs/theme/custom-style.html)
