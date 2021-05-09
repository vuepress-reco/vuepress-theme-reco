<template>
  <header class="navbar-container">
    <NavbarLinks />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavbarLinks from './NavbarLinks'

export default defineComponent({
  components: { NavbarLinks },
  setup() {
    return {}
  },
})
</script>
