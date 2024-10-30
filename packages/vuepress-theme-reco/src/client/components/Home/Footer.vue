<template>
  <div class="footer-wrapper">
    <span>
      <Xicons
        target="_blank"
        :icon="IconColorPalette"
        :text="`vuepress-theme-reco@${version}`"
        link="https://vuepress-theme-reco.recoluan.com"
      />
    </span>

    <span v-show="frontmatter?.footer?.record">
      <Xicons
        :icon="IconSecurity"
        :link="frontmatter?.footer?.recordLink"
        :text="frontmatter?.footer?.record"
        target="_blank"
      />
    </span>

    <span>
      <Xicons :text="copyRight" :icon="IconCopyRight">
        <template #icon>
          <svg class="xicon-icon" style="width: 18px; height: 18px; font-size: 18px; color: inherit;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M14 9.75a3.016 3.016 0 0 0-4.163.173a2.993 2.993 0 0 0 0 4.154A3.016 3.016 0 0 0 14 14.25"></path></g></svg>
        </template>
      </Xicons>
    </span>

    <span v-if="showAccessNumber">
      <Xicons :icon="IconEye">
        <ValineViews v-if="solution==='valine'" :idVal="homeLink" />
        <WalineViews v-if="solution==='waline'" :path="homeLink" />
      </Xicons>
    </span>

    <span class="cyber-security" v-if="frontmatter?.footer?.cyberSecurityRecord">
      <img src="../../assets/cyberSecurityRecord.png" alt="">
      <a :href="frontmatter?.footer?.cyberSecurityLink || '#'" target="_blank">{{ frontmatter?.footer?.cyberSecurityRecord }}</a>
    </span>

    <Comments v-if="!isShowCommentAtHomePage" :hide-comments="true" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import packageInfo from 'vuepress-theme-reco/package.json'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/composables'
import { IconColorPalette, IconSecurity, IconEye, IconCopyRight } from '@components/icons/index.js'

import { useThemeLocaleData, usePageFrontmatter } from '@composables/index.js'

const routeLocale = useRouteLocale()
const themeLocal = useThemeLocaleData()
const frontmatter = usePageFrontmatter()
const { solution, options } = useComment()

const { version } = packageInfo

const showAccessNumber = computed(() => {
  if (solution.value === 'valine') return options.value.visitor != false
  if (solution.value === 'waline') return options.value.pageview != false
  return false
})

const copyRight = computed(() => {
  let text = ''

  if (themeLocal.value.author) {
    text += `${themeLocal.value.author} `
  }

  const startYear = frontmatter.value?.footer?.startYear
  const currYear = new Date().getFullYear()

  if (startYear && startYear != currYear) {
    text += `${startYear} - `
  }

  text += currYear

  return text
})

const homeLink = computed(() => themeLocal.value.home || routeLocale.value)

const isShowCommentAtHomePage = computed(() => {
  return (frontmatter.value.modules || [])?.includes('Comment')
})
</script>
