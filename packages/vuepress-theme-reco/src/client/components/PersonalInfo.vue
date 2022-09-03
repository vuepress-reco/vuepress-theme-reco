<template>
<div class="personal-info-wrapper">
  <img
    class="personal-img"
    v-if="themeLocal.authorAvatar"
    :src="$withBase(themeLocal.authorAvatar)"
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

<script>
import { defineComponent, computed } from 'vue'
import { createOneColor } from '../utils'
import { withBase, usePageFrontmatter } from '@vuepress/client'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'

export default defineComponent({
  setup (props, ctx) {
    const themeLocal = useThemeLocaleData()
    const frontmatter = usePageFrontmatter()

    const socialLinks = computed(() => (frontmatter.value?.blog?.socialLinks || []).map(item => {
      if (!item.color) item.color = createOneColor()
      return item
    }))

    return { themeLocal, socialLinks }
  }
})
</script>
