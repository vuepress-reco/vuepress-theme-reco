---
title: Register components
date: 2022-04-27 00:56:21
---

::: warning
Please refer to [Guide/Style](/en/docs/guide/style) for writing style.
:::

By default, the theme registers the `.vue` components under `/.vuepress/components` globally, so the components that need to be previewed should be placed in this directory.

If our documentation project is stored in a subdirectory of the project, such as the `/doc` folder, we need to set `themeConfig.componentsDir` to `./docs/.vuepress/components`.
