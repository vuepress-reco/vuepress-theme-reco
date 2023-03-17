<script lang="ts" setup>
import { computed } from 'vue'
import { useRouteLocale, useSiteLocaleData, withBase } from '@vuepress/client'
import { useThemeLocaleData } from '../composables'

const siteLocale = useSiteLocaleData()
const routeLocale = useRouteLocale()
const themeLocal = useThemeLocaleData()

const siteBrandLink = computed(
  () => themeLocal.value.home || routeLocale.value
)

const siteBrandLogo = computed(() => themeLocal.value.logo)

const siteBrandTitle = computed(() => siteLocale.value.title)
</script>

<template>
  <div class="site-brand">
    <img
      v-if="siteBrandLogo"
      class="logo"
      :src="withBase(siteBrandLogo)"
      :alt="siteBrandTitle"
    />

    <RouterLink
      v-if="siteBrandTitle"
      :to="siteBrandLink"
      class="site-name"
      :class="{ 'can-hide': siteBrandLogo }"
    >
      {{ siteBrandTitle }}
    </RouterLink>
  </div>
</template>

<style>
@import '@vuepress-reco/tailwindcss-config/lib/client/styles/tailwindcss-base.css';

.site-brand {
  @apply flex text-xl font-semibold;
  .logo {
    @apply mr-4 inline-block w-8 h-8 rounded-lg;
  }
  /* .site-name {
    @apply align-middle;
  } */
}
</style>
