<template>
  <aside class="sidebar-container w-80 fixed z-10 top-14 bottom-0">
    {{ sidebarItems }}
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSidebarItems } from '../../composables'

export default defineComponent({
  setup() {
    const sidebarItems = useSidebarItems()
    console.log(sidebarItems)
    return {
      sidebarItems,
    }
  },
})
</script>
