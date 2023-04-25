<template>
  <div class="footer-wrapper">
    <span>
      <Xicons
        icon="ColorPalette"
        link="https://vuepress-theme-reco.recoluan.com"
        target="_blank"
        :text="`vuepress-theme-reco@${version}`"
      />
    </span>

    <span v-show="frontmatter?.footer?.record">
      <Xicons
        icon="Security"
        :link="frontmatter?.footer?.recordLink"
        :text="frontmatter?.footer?.record"
        target="_blank"
      />
    </span>

    <span>
      <Xicons :text="copyRight">
        <template #icon>
          <svg class="xicon-icon" style="width: 18px; height: 18px; font-size: 18px; color: inherit;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M14 9.75a3.016 3.016 0 0 0-4.163.173a2.993 2.993 0 0 0 0 4.154A3.016 3.016 0 0 0 14 14.25"></path></g></svg>
        </template>
      </Xicons>
    </span>

    <span v-if="showAccessNumber">
      <Xicons>
        <template #icon>
          <svg class="xicon-icon" style="width: 18px; height: 18px; font-size: 18px; color: inherit;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12"><g fill="none"><path d="M1.974 6.659a.5.5 0 0 1-.948-.317c-.01.03 0-.001 0-.001a1.633 1.633 0 0 1 .062-.162c.04-.095.099-.226.18-.381c.165-.31.422-.723.801-1.136C2.834 3.827 4.087 3 6 3c1.913 0 3.166.827 3.931 1.662a5.479 5.479 0 0 1 .98 1.517l.046.113c.003.008.013.06.023.11L11 6.5s.084.333-.342.474a.5.5 0 0 1-.632-.314v-.003l-.006-.016a3.678 3.678 0 0 0-.172-.376a4.477 4.477 0 0 0-.654-.927C8.584 4.673 7.587 4 6 4s-2.584.673-3.194 1.338a4.477 4.477 0 0 0-.795 1.225a2.209 2.209 0 0 0-.03.078l-.007.018zM6 5a2 2 0 1 0 0 4a2 2 0 0 0 0-4zM5 7a1 1 0 1 1 2 0a1 1 0 0 1-2 0z" fill="currentColor"></path></g></svg>
        </template>
        <ValineViews :idVal="homeLink" />
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
import { usePageFrontmatter, useRouteLocale } from '@vuepress/client'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import packageInfo from 'vuepress-theme-reco/package.json'

const routeLocale = useRouteLocale()
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

  if (themeLocal.value.author) {
    text += `${themeLocal.value.author} `
  }

  const startYear = frontmatter?.footer?.startYear
  const currYear = new Date().getFullYear()

  if (startYear && startYear != currYear) {
    text += `${startYear} - `
  }

  text += currYear

  return text
})

const homeLink = computed(() => themeLocal.value.home || routeLocale.value)
</script>
