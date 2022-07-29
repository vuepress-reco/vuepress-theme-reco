<template>
  <header ref="navbar" class="navbar-container">
    <ToggleSidebarButton @toggle="toggleSidebar" />

    <span ref="siteBrand" class="site-brand">
      <RouterLink :to="siteBrandLink">
        <img
          v-if="siteBrandLogo"
          class="logo"
          :src="withBase(siteBrandLogo)"
          :alt="siteBrandTitle"
        />

        <span
          v-if="siteBrandTitle"
          class="site-name"
          :class="{ 'can-hide': siteBrandLogo }"
        >
          {{ siteBrandTitle }}
        </span>
      </RouterLink>
    </span>

    <div class="navbar-links-wrapper" :style="linksWrapperStyle">
      <NavbarSearch />
      <NavbarLinks />
      <ToggleDarkModeButton />
    </div>

  </header>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouteLocale, useSiteLocaleData, withBase } from '@vuepress/client'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import ToggleDarkModeButton from './ToggleDarkModeButton.vue'
import NavbarLinks from './NavbarLinks.vue'
import ToggleSidebarButton from './ToggleSidebarButton.vue'
import ModeSwitch from './ModeSwitch.vue'

export default defineComponent({
  components: { NavbarLinks, ToggleSidebarButton, ToggleDarkModeButton },
  emits: ['toggle-sidebar'],
  setup(_, ctx) {
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

    const toggleSidebar = (): void => {
      ctx.emit('toggle-sidebar')
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
      siteBrandLink,
      siteBrandLogo,
      siteBrandTitle,
      linksWrapperStyle,
      withBase,
      navbar,
      siteBrand,
      toggleSidebar,
    }
  },
})
</script>
