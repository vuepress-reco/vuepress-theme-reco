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
    console.log(222, sidebarItems.value)
    return {
      sidebarItems,
    }
  },
})
</script>

<style lang="scss">
.sidebar-container {
  .sidebar-item {
    a {
      @apply block pl-4 py-4;
      & + ul {
        @apply pl-4;
      }
      &.router-link-active {
        @apply relative text-primary-500;
        &::before {
          @apply absolute inset-y-0 left-1.5 m-auto block w-1 h-1 rounded-1/2 bg-primary-600;
          content: '';
        }
      }
    }
    p.sidebar-heading {
      @apply block pl-4 py-4;
      & + ul {
        @apply pl-4;
      }
      &.active {
        @apply text-primary-500;
      }
    }
    > a.router-link-active::before {
      @apply left-1 w-1.5 h-1.5;
    }
  }
  > a.sidebar-item {
    @apply block pl-9 py-4;
    &.router-link-active {
      @apply relative text-primary-500;
      &::before {
        @apply absolute inset-y-0 left-6 m-auto block w-1.5 h-1.5 rounded-1/2 bg-primary-600;
        content: '';
      }
    }
  }
  > .sidebar-item {
    @apply pl-5;
    > p.sidebar-heading {
      @apply font-semibold;
    }
  }
}
</style>
