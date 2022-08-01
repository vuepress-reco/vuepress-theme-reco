<template>
  <div class="footer-wrapper">
    <span>
      <Xicons
        icon="Palette"
        link="http://v2.vuepress-reco.recoluan.com"
        target="_blank"
        :text="`vuepress-theme-reco@${version}`"
      />
    </span>
    <span v-if="frontmatter?.footer?.record">
      <Xicons
        icon="ShieldCheck"
        :link="frontmatter?.footer?.recordLink || '#'"
        :text="frontmatter?.footer?.record"
      />
    </span>
    <span>
      <Xicons icon="Copyright">
        <a v-if="themeLocal.author">{{themeLocal.author}}</a>&nbsp;&nbsp;
        <a v-if="frontmatter?.footer?.startYear && frontmatter?.footer?.startYear != (new Date().getFullYear())">{{frontmatter?.footer?.startYear}} - </a>
        {{new Date().getFullYear()}}
      </Xicons>
    </span>
    <span v-show="showAccessNumber">
      <Xicons icon="Eye">
        <ValineViews idVal="/" :numStyle="{}" />
      </Xicons>
    </span>
    <p class="cyber-security" v-if="frontmatter?.footer?.cyberSecurityRecord">
      <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt="">
      <a :href="frontmatter?.footer?.cyberSecurityLink || '#'">{{ frontmatter?.footer?.cyberSecurityRecord }}</a>
    </p>

    <Comments :hide-comments="true" />
  </div>
</template>

<script setup>
import { defineComponent, computed } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
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
</script>
