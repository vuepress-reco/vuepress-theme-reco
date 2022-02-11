<template>
  <Xicons :icon="icon" icon-size="20" @click="toggleMode()" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const mode = ref('')
const icon = computed(() => {
  return mode.value === 'dark' ? 'Sun' : 'MoonStars'
})

const toggleMode = (m) => {
  if (m) {
    mode.value = m
  } else {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  localStorage['vuepress-reco-color-scheme'] = mode.value

  if (mode.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const initMode = () => {
  if (localStorage['vuepress-reco-color-scheme'] === 'dark' || (!('vuepress-reco-color-scheme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    toggleMode('dark')
  } else {
    toggleMode('light')
  }
}

initMode()
</script>
