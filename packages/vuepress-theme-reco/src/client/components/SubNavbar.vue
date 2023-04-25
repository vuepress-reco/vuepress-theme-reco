<template>
  <header ref="navbar" class="sub-navbar-container">
    <template v-if="seriesItems.length > 0">
      <span class="nav-item">
        <ToggleSeriesButton @toggle="toggleSeries" />
        Series
      </span>
    </template>
  </header>
</template>

<script lang="ts" setup>
import ToggleSeriesButton from './ToggleSeriesButton.vue'
import { useSeriesItems } from '../composables'

const seriesItems = useSeriesItems()

const emits = defineEmits(['toggle-series'])
const toggleSeries = (): void => {
  emits('toggle-series')
}
</script>
