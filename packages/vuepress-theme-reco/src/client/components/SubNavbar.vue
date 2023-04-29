<template>
  <header ref="subnavbar" class="sub-navbar-container">
    <span class="nav-item">
      <ToggleSeriesButton @toggle="toggleSeries" />
      Series
    </span>
  </header>
</template>

<script lang="ts" setup>
import ToggleSeriesButton from './ToggleSeriesButton.vue'

const emits = defineEmits(['toggle-series'])

const toggleSeries = (): void => {
  emits('toggle-series')
}
</script>
