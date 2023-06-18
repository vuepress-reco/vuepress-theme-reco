<template>
  <div class="common-wrapper" :class="containerClass">
    <Password
      v-if="siteLoaded && !sitePasswordPass"
      class="out"
      key="out"
      @pass="handlePass"
    />

    <div v-if="siteLoaded && sitePasswordPass">
      <Navbar @toggleMenus="toggleMobileMenus" />
      <SubNavbar v-if="seriesItems.length > 0" @toggleSeries="toggleSeries" />
      <NavbarDropdownNemu />
      <div class="series-mask" @click="toggleSeries(false)" />
      <Series />
      <slot />
      <Catalog v-if="isShowCatalog" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { usePageFrontmatter } from '@vuepress/client'

import { useSeriesItems } from '../../composables'
import Navbar from '../Navbar.vue'
import SubNavbar from '../SubNavbar.vue'
import Series from '../Series.vue'
import Catalog from '../Catalog.vue'
import Password from '../Password/index.vue'
import NavbarDropdownNemu from '../NavbarDropdownNemu.vue'

import { useSeries, usePassword, useInitCodeCopy } from './hook'
import { useSeriesData, useMobileMenus } from '../../composables'
import { RecoThemeNormalPageFrontmatter } from '../../../types'

const frontmatter = usePageFrontmatter<RecoThemeNormalPageFrontmatter>()

const {
  isOpenSeries,
  isShowSeries,
  isShowCatalog,
  toggleSeries,
} = useSeriesData()

const { isOpenMobileMenus, toggleMobileMenus } = useMobileMenus()

const { siteLoaded, sitePasswordPass, handlePass } = usePassword()

const containerClass = computed(() => [
  {
    'series--open': isOpenSeries.value,
    'series--no': !isShowSeries.value,
    'show-series': isShowSeries.value,
    'show-catalog': isShowCatalog.value,
    'mobile-menus--active': isOpenMobileMenus.value,
  },
  frontmatter.value.pageClass,
])

const seriesItems = useSeriesItems()

onMounted(() => {
  useInitCodeCopy()
})

useSeries(toggleSeries, toggleMobileMenus)
</script>
