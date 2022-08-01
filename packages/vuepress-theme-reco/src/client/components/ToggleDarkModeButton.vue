<template>
  <Xicons :icon="icon" icon-size="19" class="btn-toggle-dark-mode" @click="toggleMode()" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const APPEARANCE_KEY = 'vuepress-reco-color-scheme'

const isDarkMode = ref(false)
const icon = computed(() => {
  return isDarkMode.value ? 'Sun' : 'MoonStars'
})

let toggleMode = () => {
  isDarkMode.value = !isDarkMode.value
}

onMounted(() => {
  let userPreference = localStorage[APPEARANCE_KEY] || 'auto'

  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const classList = document.documentElement.classList

  function setClass(dark: boolean): void {
    classList.toggle('dark', dark)
  }

  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((isDarkMode.value = e.matches))
    }
  }

  watch(isDarkMode, (m) => {
    localStorage[APPEARANCE_KEY] = m
      ? query.matches ? 'auto' : 'dark'
      : query.matches ? 'light' : 'auto'
    setClass(isDarkMode.value)
  })

  const initMode = () => {
    isDarkMode.value = userPreference === 'auto'
      ? query.matches
      : userPreference === 'dark'
  }

  initMode()
})
</script>
