---
title: Vue Component Preview
date: 2022-01-29
---

:::tip
By default, the theme registers the `.vue` component under `/ .vuepress/vue- previews` globally, so the components that need to be previewed should be placed in this directory. Note:`-``_ `is not allowed in the file name.

If our project is stored in a subdirectory of the project, such as the `/ docs` folder, we need to set `themeConfig.vuePreviewsDir` to`. / docs/.vuepress/vue- previews`.
:::

**Input**

```md
@[preview](@/docs/.vuepress/vue-previews/demo.vue)
```

**Output**

@[preview](@/docs/.vuepress/vue-previews/demo.vue)
