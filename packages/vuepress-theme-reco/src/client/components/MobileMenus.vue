<template>
  <div class="mobile-menus-container">
    <NavbarLinks />
    <div class="appearance"><span>Appearance </span><ToggleDarkModeButton /></div>
  </div>
</template>

<script setup lang="ts">
import NavbarLinks from './NavbarLinks.vue'
import ToggleDarkModeButton from './ToggleDarkModeButton.vue'

</script>
