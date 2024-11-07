<template>
  <div class="page-catalog-container">
    <h5 class="tip">{{ catalogTitle }}</h5>
    <ul>
      <template v-for="item in catalog" :key="item.link || item.text">
        <CatalogItem :item="item" />
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageCatalog, useThemeLocaleData } from '@composables/index.js'
import { CatalogItem } from './CatalogItem.js'

const { catalog } = usePageCatalog()
const themeConfig = useThemeLocaleData()

const catalogTitle = computed(() => {
  return themeConfig.value.catalogTitle || 'ON THIS PAGE'
})
</script>
