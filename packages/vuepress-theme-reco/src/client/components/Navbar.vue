<template>
  <header ref="navbar" class="navbar-container" :style="{ top: seriesItems.length > 0 ? '-4rem' : '0' }">
    <SiteBrand class="nav-item " />

    <div class="nav-item navbar-links-wrapper" :style="linksWrapperStyle">
      <div>
      <NavbarSearch /></div>
      <NavbarLinks />
      <ToggleDarkModeButton class="btn--dark-mode" />
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
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouteLocale, useSiteLocaleData, withBase } from '@vuepress/client'
import ToggleDarkModeButton from './ToggleDarkModeButton.vue'
import NavbarLinks from './NavbarLinks.vue'
import { useThemeLocaleData, useSeriesItems } from '../composables'
import Xicons from './global/Xicons.vue'
import SiteBrand from './SiteBrand.vue'

const seriesItems = useSeriesItems()
const siteLocale = useSiteLocaleData()
const routeLocale = useRouteLocale()
const themeLocal = useThemeLocaleData()

const siteBrandLink = computed(
  () => themeLocal.value.home || routeLocale.value
)
const siteBrandLogo = computed(() => themeLocal.value.logo)
const siteBrandTitle = computed(() => siteLocale.value.title)

const navbar = ref<HTMLElement | null>(null)
const siteBrand = ref<HTMLElement | null>(null)
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
const toggleMenus = (): void => {
  emits('toggle-menus')
}

onMounted(() => {
  // TODO: migrate to css var
  // refer to _variables.scss
  const MOBILE_DESKTOP_BREAKPOINT = 719
  const handleLinksWrapWidth = (): void => {
    if (window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT) {
      linksWrapperMaxWidth.value = 0
    } else {
      linksWrapperMaxWidth.value =
        (navbar.value as HTMLElement)?.offsetWidth - (siteBrand.value?.offsetWidth || 0) - 50
    }
  }
  handleLinksWrapWidth()
  window.addEventListener('resize', handleLinksWrapWidth, false)
  window.addEventListener('orientationchange', handleLinksWrapWidth, false)
})
</script>
