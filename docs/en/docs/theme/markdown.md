---
title: Markdown Extension
date: 2022-01-29 16:24:23
---

`vuepress-theme- reco` extends the following capabilities based on the original capabilities of `vuepress`.

## Task List

**Input**

```md
- [x] Play game
- [ ] Study
```

**Output**

- [x] Play game
- [ ] Study

## Preview of Vue components

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

## Parse File To Code Group

**Input**

```md
@[code-group](@/docs/.vuepress/vue-previews/demo.vue)
```

**Output**

@[code-group](@/docs/.vuepress/vue-previews/demo.vue)
