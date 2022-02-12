<template>
  <Xicons :icon="icon" icon-size="20" @click="toggleMode()" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
const isDarkMode = ref(false)
const icon = computed(() => {
  return isDarkMode.value ? 'Sun' : 'MoonStars'
})

let toggleMode = () => {
  isDarkMode.value = !isDarkMode.value
}

onMounted(() => {
  watch(isDarkMode, (m) => {
    localStorage['vuepress-reco-color-scheme'] = m ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  })

  const initMode = () => {
    if ('vuepress-reco-color-scheme' in localStorage) {
      isDarkMode.value = localStorage['vuepress-reco-color-scheme'] === 'dark'
    } else {
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  initMode()
})
</script>
