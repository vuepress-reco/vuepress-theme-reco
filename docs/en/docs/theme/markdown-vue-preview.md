---
title: Vue Component Preview
date: 2022-01-29
---

:::warning
Note that the version after `2.0.0-rc.5` cancels the ability of the `vue-previews` folder, and all components can be declared in the folder `components`.
:::

:::tip
By default, the theme registers the `.vue` component under `/.vuepress/components` globally, so the components that need to be previewed should be placed in this directory. Note:`-``_ `is not allowed in the file name.

If our project is stored in a subdirectory of the project, such as the `/docs` folder, we need to set `themeConfig.docsDir` to `/docs`.
:::

**Input**

```md
@[preview](@/docs/.vuepress/components/demo.vue)
```

**Output**

@[preview](@/docs/.vuepress/components/demo.vue)
