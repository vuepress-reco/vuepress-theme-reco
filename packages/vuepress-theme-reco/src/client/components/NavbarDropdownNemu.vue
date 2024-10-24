<template>
  <div class="mobile-menus-container">
    <NavbarLinks class="mobile" />

    <div class="appearance">
      <span>Appearance</span>
      <ToggleDarkModeButton  v-if="themeLocal.colorModeSwitch ?? true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeLocaleData } from '@composables/index.js'

import NavbarLinks from './NavbarLinks/index.vue'
import ToggleDarkModeButton from './ToggleDarkModeButton.vue'

const themeLocal = useThemeLocaleData()
</script>
