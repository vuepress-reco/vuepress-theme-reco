---
title: Register Layouts
date: 2024-07-04
---

::: warning
- Please refer to [Guide/Style](/en/docs/guide/style) for writing style.
- By default, the theme registers the `.vue` components under `/.vuepress/components` globally.
:::

## Introduce

By default, the theme registers the `.vue` components to layout component under `/.vuepress/components` globally.If the component name is the same as the component name built into the theme, the default layout is overridden.

## Specify the layout of a page

```md
---
layout: CustomLayout
---
```

## Development

**Generic Container**

Please use `GenericContainer` as the outer container for the layout component, which will add top navigation, sidebar and other capabilities to your customized layout.

**Alias**

You can directly introduce required built-in capabilities through these aliases.

```ts
alias: {
  '@types': path.resolve(__dirname, '../types'),
  '@client': path.resolve(__dirname, '../client'),
  '@utils': path.resolve(__dirname, '../client/utils'),
  '@components': path.resolve(__dirname, '../client/components'),
  '@composables': path.resolve(__dirname, '../client/composables'),
},
```

**Style**

Please refer to [here](/en/docs/guide/style.html)。

**Example**

```vue
<template>
  <GenericContainer>
    <section class="page-404-wrapper">
      <div class="content">
        <h1>404</h1>
        <p>Oops! Page does not exist.</p>
        <div class="xicon-container">Go Home</div>
      </div>
    </section>
  </GenericContainer>
</template>

<script lang="ts" setup>
import GenericContainer from '@components/GenericContainer/index.vue'
import { useThemeLocaleData } from '@composables/index.js'
</script>

<style lang="postcss">
.page-404-wrapper {
  @apply bg-reco-primary;
}
</style>
```
