<template>
  <div
    class="toggle-sidebar-button"
    :title="themeLocal.toggleSidebar"
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
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'

const emits = defineEmits(['toggle'])

const toggle = (): void => {
  emits('toggle')
}

const themeLocal = useThemeLocaleData()
</script>
