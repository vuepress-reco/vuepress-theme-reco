<template>
  <aside class="series-container">
    <NavbarLinks />
    <template v-for="item in sidebarItems" :key="item.link || item.text">
      <SeriesItem :item="item" />
    </template>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSidebarItems } from '../composables/'
import { SeriesItem } from './SeriesItem'
import NavbarLinks from './NavbarLinks.vue'

export default defineComponent({
  components: { SeriesItem, NavbarLinks },
  setup() {
    const sidebarItems = useSidebarItems()
    return {
      sidebarItems,
    }
  },
})
</script>
