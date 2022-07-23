<template>
  <div
    :class="{
      'common-wrapper': true,
      'sidebar-open': isOpenSidebar,
      'no-sidebar': !isShowSidebar,
    }"
  >
    <Password v-if="!sitePasswordPass" class="out" key="out" @pass="handlePass" />

    <div v-else>
      <Navbar @toggleSidebar="toggleSidebar" />
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
import Navbar from '../Navbar.vue'
import Series from '../Series.vue'
import Catalog from '../Catalog.vue'
import Password from '../Password/index.vue'
import { useSidebarData } from '../../composables'
import { useSidebar, usePassword, useInitCodeCopy } from './hook'

const {
  isOpenSidebar,
  isShowSidebar,
  isShowCatalog,
  toggleSidebar
} = useSidebarData()

const {
  sitePasswordPass,
  handlePass
} = usePassword()

useInitCodeCopy()

useSidebar(toggleSidebar)
</script>
