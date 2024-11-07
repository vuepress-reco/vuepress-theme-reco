<template>
  <header ref="navbar" :class="{ 'navbar-container': true, 'has-border': scrollY > 20 }">
    <div class="navbar-inner">
      <SiteBrand class="nav-item" :icon="customIcon" :title="customTitle" :link="customLink" />

      <div class="nav-item navbar-links-wrapper" :style="linksWrapperStyle">
        <div>
          <NavbarSearch />
        </div>

        <NavbarLinks />

        <Xicons
          class="btn-toggle-menus"
          :icon="IconOverflowMenuVertical"
          :iconSize="20"
          @click="toggleMenus"
        />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { IconOverflowMenuVertical } from '@components/icons/index.js'

import SiteBrand from './SiteBrand.vue'
import Xicons from '../global/Xicons.vue'
import NavbarLinks from '../NavbarLinks/index.vue'

import { useSiteBrand } from './useSiteBrand.js'
import { useScrollDirection } from '@composables/index.js'

const { customTitle, customLink, customIcon } = useSiteBrand()

const linksWrapperMaxWidth = ref(0)
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {}
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  }
})

const emits = defineEmits(['toggle-menus'])
const toggleMenus = (bool: boolean): void => {
  emits('toggle-menus', bool)
}

const { scrollY } = useScrollDirection()
</script>
