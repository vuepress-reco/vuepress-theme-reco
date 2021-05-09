<template>
  <aside class="sidebar-container w-80 fixed z-10 top-14 bottom-0">
    <template v-for="item in sidebarItems" :key="item.link || item.text">
      <SidebarChild :item="item" />
    </template>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSidebarItems } from '../composables/'
import { SidebarChild } from './SidebarChild'

export default defineComponent({
  components: { SidebarChild },
  setup() {
    const sidebarItems = useSidebarItems()
    return {
      sidebarItems,
    }
  },
})
</script>
