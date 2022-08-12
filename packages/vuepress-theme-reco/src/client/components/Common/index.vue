<template>
  <div
    :class="{
      'common-wrapper': true,
      'sidebar-open': isOpenSidebar,
      'no-sidebar': !isShowSidebar,
      'mobile-menus-open': isOpenMobileMenus
    }"
  >
    <Password v-if="!sitePasswordPass" class="out" key="out" @pass="handlePass" />

    <div v-else>
      <Navbar @toggleSidebar="toggleSidebar" @toggleMenus="toggleMobileMenus" />
      <MobileNavbar />
      <div class="sidebar-mask" @click="toggleSidebar(false)" />
      <Series />
      <slot />
      <Catalog v-if="isShowCatalog" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import MobileNavbar from '../MobileMenus.vue'
import Navbar from '../Navbar.vue'
import Series from '../Series.vue'
import Catalog from '../Catalog.vue'
import Password from '../Password/index.vue'
import { useSidebarData, useMobileMenus } from '../../composables'
import { useSidebar, usePassword, useInitCodeCopy } from './hook'

const {
  isOpenSidebar,
  isShowSidebar,
  isShowCatalog,
  toggleSidebar
} = useSidebarData()

const {
  isOpenMobileMenus,
  toggleMobileMenus
} = useMobileMenus()

const {
  sitePasswordPass,
  handlePass
} = usePassword()

useInitCodeCopy()

useSidebar(toggleSidebar)
</script>
