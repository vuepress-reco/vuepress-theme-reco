<template>
  <header ref="subnavbar" class="sub-navbar-container">
    <span class="nav-item">
      <div
        class="toggle-series-button"
        aria-expanded="false"
        role="button"
        tabindex="0"
        @click="toggleSeries"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      Series
    </span>
  </header>
</template>

<script lang="ts" setup>
const emits = defineEmits(['toggle-series'])

const toggleSeries = (): void => {
  emits('toggle-series')
}
</script>
