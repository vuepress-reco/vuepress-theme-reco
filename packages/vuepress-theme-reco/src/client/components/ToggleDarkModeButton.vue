<template>
  <Xicons
    :icon="icon"
    icon-size="20"
    link="javascript:void(0)"
    class="btn-toggle-dark-mode"
    @click="toggleMode()"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, Ref } from 'vue'

enum ModeIcon {
  auto = 'BrightnessAutoOutlined',
  dark = 'MoonStars',
  light = 'Sun'
}

enum EMode {
  auto,
  dark,
  light
}

type TMode = keyof typeof EMode

const APPEARANCE_KEY = 'vuepress-reco-color-scheme'

let userPreference = localStorage[APPEARANCE_KEY] || 'auto'
const mode: Ref<TMode> = ref(userPreference)

const icon = computed(() => {
  return ModeIcon[mode.value]
})

let toggleMode = () => {
  const currModeIndex = EMode[mode.value]
  const nextModeIndex = currModeIndex === 2 ? 0 : currModeIndex + 1

  mode.value = EMode[nextModeIndex] as TMode
}

onMounted(() => {
  const classList = document.documentElement.classList

  function setDarkClass(dark: boolean): void {
    classList.toggle('dark', dark)
  }

  function handleModeChange(m) {
    if (m === 'auto') {
      setDarkClass(darkMedia.matches)
      localStorage.removeItem(APPEARANCE_KEY)
    } else {
      setDarkClass(m === 'dark')
      localStorage[APPEARANCE_KEY] = m
    }
  }

  const darkMedia = window.matchMedia('(prefers-color-scheme: dark)')

  // 监听系统化的 mode 变化
  darkMedia.onchange = (e) => {
    if (mode.value === 'auto') {
      setDarkClass((e.matches))
    }
  }

  // 监听手动切换 mode
  watch(mode, handleModeChange)

  handleModeChange(mode.value)
})
</script>
