<template>
  <div class="footer-wrapper">
    <span>
      <Xicons
        icon="tabler.Palette"
        link="http://v2.vuepress-reco.recoluan.com"
        target="_blank"
        :text="`vuepress-theme-reco@${version}`"
      />
    </span>

    <span v-show="frontmatter?.footer?.record">
      <Xicons
        icon="tabler.ShieldCheck"
        :link="frontmatter?.footer?.recordLink"
        :text="frontmatter?.footer?.record"
        target="_blank"
      />
    </span>

    <span>
      <Xicons icon="tabler.Copyright" :text="copyRight" />
    </span>

    <span v-if="showAccessNumber">
      <Xicons icon="fluent.Eye12Regular">
        <ValineViews idVal="/" />
      </Xicons>
    </span>

    <span class="cyber-security" v-if="frontmatter?.footer?.cyberSecurityRecord">
      <img src="../../assets/cyberSecurityRecord.png" alt="">
      <a :href="frontmatter?.footer?.cyberSecurityLink || '#'" target="_blank">{{ frontmatter?.footer?.cyberSecurityRecord }}</a>
    </span>

    <Comments :hide-comments="true" />
  </div>
</template>

<script setup>
import { defineComponent, computed } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { usePageFrontmatter } from '@vuepress/client'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import packageInfo from 'vuepress-theme-reco/package.json'

const themeLocal = useThemeLocaleData()
const frontmatter = usePageFrontmatter()
const { solution, options } = useComment()

const { version } = packageInfo

const showAccessNumber = computed(() => {
 if (solution.value !== 'valine') return false

  return options.value.visitor != false
})

const copyRight = computed(() => {
  let text = ''

  if (themeLocal.author) {
    text += `${themeLocal.author} `
  }

  const startYear = frontmatter?.footer?.startYear
  const currYear = new Date().getFullYear()

  if (startYear && startYear != currYear) {
    text += `${startYear} - `
  }

  text += currYear

  return text
})
</script>
