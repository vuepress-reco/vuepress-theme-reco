---
title: Style
date: 2022-08-06 21:44:36
---

## Introduce

The css scheme of the reco theme is [tailwindcss 3.0](https://tailwindcss.com/docs/installation) + [postcss-nested](https://github.com/postcss/postcss-nested) + [postcss-each](https://github.com/madyankin/postcss-each), you can directly write nested formats and loop formats (similar to scss) in css, which can be used directly regardless of custom styles or custom components.

## Example

:::: code-group
::: code-group-item tailwindcss in html
```html
<div class="bg-indigo-500">reco_luan</div>
```
:::
::: code-group-item tailwindcss in css
````css
ul {
   @apply flex items-center list-none;
   li {
     @apply text-center text-base text-black;
   }
}
````
:::
::: code-group-item css nesting
````css
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
````
:::
::: code-group-item css loop
````css
@each $lang in html, css, javascript, vue {
   div.language-$(lang)::before {
     content: '$(lang)';
   }
}
````
:::
::::

## Notice

If you use the base, variables and components customized by the reco theme when writing tailwindcss, you need to import `@vuepress-reco/tailwindcss-config/lib/client/tailwindcss-base.css` at the top of the css file:

````css
@import url('@vuepress-reco/tailwindcss-config/lib/client/tailwindcss-base.css');
````