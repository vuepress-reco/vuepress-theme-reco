<template>
<div class="personal-info-wrapper">
  <img
    class="personal-img"
    v-if="themeLocal.authorAvatar"
    :src="withBase(themeLocal.authorAvatar)"
    alt="author-avatar"
  >
  <p
    class="name"
    v-if="themeLocal.author"
  >
    {{ themeLocal.author }}
  </p>

  <!-- 支持 hover 展示文案、图片 -->
  <ul class="social-links">
    <li
      class="social-item"
      v-for="(item, index) in socialLinks"
      :key="index"
    >
      <Xicons :icon="item.icon" :link="item.link" :style="{ color: item.color }" target="_blank" />
    </li>
  </ul>
  <hr>
</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { withBase, usePageFrontmatter } from 'vuepress/client'

import { createOneColor } from '@utils/index.js'
import { useThemeLocaleData } from '@composables/index.js'

import type { RecoThemeHomePageFrontmatter } from '../../types'

const themeLocal = useThemeLocaleData()

const frontmatter = usePageFrontmatter<RecoThemeHomePageFrontmatter>()
const socialLinks = computed(() => (frontmatter.value?.blog?.socialLinks || []).map(item => {
  if (!item.color) item.color = createOneColor()
  return item
}))
</script>
