<template>
  <header class="navbar-container">
    <!-- <span> -->
    <RouterLink class="site-brand" :to="siteBrandLink">
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
    <!-- </span> -->
    <div class="navbar-links-wrapper">
      <NavbarLinks />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouteLocale, useSiteLocaleData, withBase } from '@vuepress/client'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import NavbarLinks from './NavbarLinks'

export default defineComponent({
  components: { NavbarLinks },
  setup() {
    const siteLocale = useSiteLocaleData()
    const routeLocale = useRouteLocale()
    const themeLocale = useThemeLocaleData()

    const siteBrandLink = computed(
      () => themeLocale.value.home || routeLocale.value
    )
    const siteBrandLogo = computed(() => themeLocale.value.logo)
    const siteBrandTitle = computed(() => siteLocale.value.title)

    return {
      siteBrandLink,
      siteBrandLogo,
      siteBrandTitle,
      withBase,
    }
  },
})
</script>
