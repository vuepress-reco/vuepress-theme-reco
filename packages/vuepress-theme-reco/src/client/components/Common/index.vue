<template>
  <div v-if="!setedSitePassword" class="theme-container" :class="containerClass">
    <Navbar @toggleMenus="toggleMobileMenus" />
    <SubNavbar v-if="seriesItems.length > 0" @toggleSeries="toggleSeries" />
    <NavbarDropdownNemu />
    <div class="series-mask" @click="toggleSeries(false)" />
    <Series />
    <slot />
    <Catalog v-if="isShowCatalog" />
  </div>

  <div v-else class="theme-container" :class="containerClass">
    <Password v-if="siteLoaded && !sitePasswordPass" class="out" key="out" @pass="handlePass" />

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
import Navbar from '../Navbar.vue'
import Series from '../Series.vue'
import Catalog from '../Catalog.vue'
import SubNavbar from '../SubNavbar.vue'
import Password from '../Password/index.vue'
import NavbarDropdownNemu from '../NavbarDropdownNemu.vue'

import { useSeriesItems } from '@composables/index.js'
const seriesItems = useSeriesItems()

import { useSeriesData } from '@composables/index.js'
const { toggleSeries } = useSeriesData()

import { usePageCatalog } from '@composables/index.js'
const { isShowCatalog } = usePageCatalog()

import { useMobileMenus } from '@composables/index.js'
const { toggleMobileMenus } = useMobileMenus()

// Handle password
import { usePassword } from './usePassword.js'
const { siteLoaded, sitePasswordPass, setedSitePassword, handlePass } = usePassword()

// Format className of container
import { useContainerClass } from './useContainerClass.js'
const { containerClass } = useContainerClass()

// Init code copy button
import { useInitCodeCopy } from './useInitCodeCopy.js'
const { initCodeCopy } = useInitCodeCopy()
initCodeCopy()

// Init series status
import { useSeries } from './useSeries.js'
const { initSeriesStatus } = useSeries()
initSeriesStatus(() => {
  toggleSeries(false)
  toggleMobileMenus(false)
})

</script>
