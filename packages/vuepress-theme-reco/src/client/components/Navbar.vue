<template>
  <header ref="navbar" class="navbar-container">
    <template v-if="direction === 'top' && seriesItems.length > 0">
      <span class="nav-item">
        <ToggleSeriesButton @toggle="toggleSeries" />
        Series
      </span>
    </template>

    <template v-else>
      <SiteBrand class="nav-item " />

      <div class="nav-item navbar-links-wrapper" :style="linksWrapperStyle">
        <NavbarSearch />
        <NavbarLinks />
        <ToggleDarkModeButton class="btn--dark-mode" />
        <xicons class="btn-toggle-menus" icon="OverflowMenuVertical" :iconSize="20" @click="toggleMenus" />
      </div>
    </template>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouteLocale, useSiteLocaleData, withBase } from '@vuepress/client'
import ToggleDarkModeButton from './ToggleDarkModeButton.vue'
import NavbarLinks from './NavbarLinks.vue'
import ToggleSeriesButton from './ToggleSeriesButton.vue'
import { useSeriesItems, useScrollDirection, useThemeLocaleData } from '../composables'
import Xicons from './global/Xicons.vue'
import SiteBrand from './SiteBrand.vue'

export default defineComponent({
  components: { NavbarLinks, ToggleSeriesButton, ToggleDarkModeButton, Xicons, SiteBrand },
  emits: ['toggle-series', 'toggle-menus'],
  setup(_, ctx) {
    const siteLocale = useSiteLocaleData()
    const routeLocale = useRouteLocale()
    const themeLocal = useThemeLocaleData()
    const seriesItems = useSeriesItems()
    const { direction } = useScrollDirection()

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

    const toggleSeries = (): void => {
      ctx.emit('toggle-series')
    }

    const toggleMenus = (): void => {
      ctx.emit('toggle-menus')
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

    return {
      direction,
      seriesItems,
      siteBrandLink,
      siteBrandLogo,
      siteBrandTitle,
      linksWrapperStyle,
      withBase,
      navbar,
      siteBrand,
      toggleSeries,
      toggleMenus,
    }
  },
})
</script>
