---
title: Import Code
date: 2022-01-29 16:24:23
---

## single file import

**input**

```md
@[code](../../.vuepress/vue-previews/demo.vue)
```

**output**

@[code](../../.vuepress/vue-previews/demo.vue)

## vue component import

:::tip
By default, the theme registers the `.vue` components under `/.vuepress/vue-previews` globally, so the components that need to be previewed should be placed in this directory.

If our documentation project is stored in a subdirectory of the project, such as the `/docs` folder, we need to set `themeConfig.vuePreviewsDir` to `./docs/.vuepress/vue-previews`.
:::

### vue component preview

**input**

```md
@[preview-demo](@/docs/.vuepress/vue-previews/demo.vue)
```

**output**

@[preview-demo](@/docs/.vuepress/vue-previews/demo.vue)

### The vue group only shows the code group

**input**

```md
@[preview](@/docs/.vuepress/vue-previews/demo.vue)
```

**output**

@[preview](@/docs/.vuepress/vue-previews/demo.vue)
