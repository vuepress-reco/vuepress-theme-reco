<template>
  <div
    :class="{
      'common-wrapper': true,
      'sidebar-open': isOpenSidebar,
      'no-sidebar': !isShowSidebar,
    }"
  >
    <Navbar @toggleSidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Series />
    <slot />
  
    <Catalog v-if="isShowCatalog" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Series from '../components/Series.vue'
import Catalog from '../components/Catalog.vue'
import { useSidebarData } from '../composables'

const {
  isOpenSidebar,
  isShowSidebar,
  isShowCatalog,
  toggleSidebar
} = useSidebarData()

// close sidebar after navigation
let unregisterRouterHook

onMounted(() => {
  const router = useRouter()
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false)
  })
})

onUnmounted(() => {
  unregisterRouterHook()
})
</script>
