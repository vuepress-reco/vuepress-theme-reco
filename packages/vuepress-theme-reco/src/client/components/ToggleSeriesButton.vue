<template>
  <div
    class="toggle-series-button"
    :title="themeLocal.toggleSeries"
    aria-expanded="false"
    role="button"
    tabindex="0"
    @click="toggle"
  >
    <div class="icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'

const emits = defineEmits(['toggle'])

const toggle = (): void => {
  emits('toggle')
}

const themeLocal = useThemeLocaleData()
</script>
