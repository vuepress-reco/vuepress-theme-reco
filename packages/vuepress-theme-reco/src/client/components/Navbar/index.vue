<template>
  <header ref="navbar" class="navbar-container">
    <SiteBrand class="nav-item" :icon="customIcon" :title="customTitle" :link="customLink" />

    <div class="nav-item navbar-links-wrapper" :style="linksWrapperStyle">
      <div>
        <NavbarSearch />
      </div>

      <NavbarLinks />

      <ToggleDarkModeButton v-if="themeLocal.colorModeSwitch ?? 'true'" class="btn--dark-mode" />

      <xicons
        class="btn-toggle-menus"
        icon="OverflowMenuVertical"
        :iconSize="20"
        @click="toggleMenus"
      />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import Xicons from '../global/Xicons.vue'
import SiteBrand from '../SiteBrand.vue'
import NavbarLinks from '../NavbarLinks.vue'
import { useThemeLocaleData } from '@composables/index.js'
import ToggleDarkModeButton from '../ToggleDarkModeButton.vue'
import { useSiteBrand } from './useSiteBrand.js'

const themeLocal = useThemeLocaleData()

const { customTitle, customLink, customIcon } = useSiteBrand()

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})

const emits = defineEmits(['toggle-menus'])
const toggleMenus = (bool: boolean): void => {
  emits('toggle-menus', bool)
}
</script>
