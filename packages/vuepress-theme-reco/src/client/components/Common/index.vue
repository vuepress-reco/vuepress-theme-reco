<template>
  <div
    class="common-wrapper"
    :class="{
      'series--open': isOpenSeries,
      'series--no': !isShowSeries,
      'show-series': isShowSeries,
      'show-catalog': isShowCatalog,
      'mobile-menus--active': isOpenMobileMenus
    }"
  >
    <Password v-if="!sitePasswordPass" class="out" key="out" @pass="handlePass" />

    <div v-else>
      <Navbar @toggleSeries="toggleSeries" @toggleMenus="toggleMobileMenus" />
      <NavbarDropdownNemu />
      <div class="series-mask" @click="toggleSeries(false)" />
      <Series />
      <slot />
      <Catalog v-if="isShowCatalog" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import NavbarDropdownNemu from '../NavbarDropdownNemu.vue'
import Navbar from '../Navbar.vue'
import Series from '../Series.vue'
import Catalog from '../Catalog.vue'
import Password from '../Password/index.vue'
import { useSeriesData, useMobileMenus } from '../../composables'
import { useSeries, usePassword, useInitCodeCopy } from './hook'

const {
  isOpenSeries,
  isShowSeries,
  isShowCatalog,
  toggleSeries
} = useSeriesData()

const {
  isOpenMobileMenus,
  toggleMobileMenus
} = useMobileMenus()

const {
  sitePasswordPass,
  handlePass
} = usePassword()

onMounted(() => {
  useInitCodeCopy()
})

useSeries(toggleSeries, toggleMobileMenus)
</script>
