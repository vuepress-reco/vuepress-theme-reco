---
title: 样式
date: 2022-08-06 21:44:36
---

## 介绍

reco 主题的 css 方案是 [tailwindcss 3.0](https://tailwindcss.com/docs/installation) + [postcss-nested](https://github.com/postcss/postcss-nested) + [postcss-each](https://github.com/madyankin/postcss-each) ，可以直接在 css 中直接书写嵌套格式和循环格式（类 scss），无论自定义样式，还是自定义组件均可直接使用。

## 示例

:::: code-group
::: code-group-item tailwindcss in html
```html
<div class="bg-indigo-500">reco_luan</div>
```
:::
::: code-group-item tailwindcss in css
```css
ul {
  @apply flex items-center list-none;
  li {
    @apply text-center text-base text-black;
  }
}
```
:::
::: code-group-item css 嵌套
```css
ul {
  diplay: flex;
  align-items: center;
  list-style: none;
  li {
    text-align: center;
    font-size: 16px;
    color: black;
  }
}
```
:::
::: code-group-item css 循环
```css
@each $lang in html, css, javascript, vue {
  div.language-$(lang)::before {
    content: '$(lang)';
  }
}
```
:::
::::

## 注意

如果在写 tailwindcss 时，用到 reco 主题自定义的基础样式、变量和组件，需要在 css 文件最上面引入 `@vuepress-reco/tailwindcss-config/lib/client/tailwindcss-base.css` ：

```css
@import url('@vuepress-reco/tailwindcss-config/lib/client/tailwindcss-base.css');
```
