<template>
  <div class="footer-wrapper">
    <span>
      <Xicons
        :icon="Alien"
        link="https://vuepress-theme-reco.recoluan.com"
        :text="`vuepress-theme-reco@${version}`"
      />
    </span>
    <span v-if="themeLocal.record">
      <Xicons
        :icon="ShieldCheck"
        :link="themeLocal.recordLink || '#'"
        :text="themeLocal.record"
      />
    </span>
    <span>
      <Xicons :icon="Copyright">
        <a v-if="themeLocal.author">{{themeLocal.author}}</a>&nbsp;&nbsp;
        <a v-if="themeLocal.startYear && themeLocal.startYear != (new Date().getFullYear())">{{themeLocal.startYear}} - </a>
        {{new Date().getFullYear()}}
      </Xicons>
    </span>
    <span v-show="showAccessNumber">
      <Xicons :icon="Eye">
        <ValineViews idVal="/" :numStyle="{}" />
      </Xicons>
    </span>
    <p class="cyber-security" v-if="themeLocal.cyberSecurityRecord">
      <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" alt="">
      <a :href="themeLocal.cyberSecurityLink || '#'">{{ themeLocal.cyberSecurityRecord }}</a>
    </p>

    <Comments :hide-comments="true" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client'
import packageInfo from '../../../package.json'
import { Copyright, ShieldCheck, Eye, Alien } from '@vicons/tabler'

export default defineComponent({
  name: 'Footer',

  setup (props, ctx) {
    const themeLocal = useThemeLocaleData()
    const { version } = packageInfo
    const showAccessNumber = computed(() => {
      const { valineConfig } = themeLocal.value

      return valineConfig.visitor != false
    })

    return { version, themeLocal, showAccessNumber, ShieldCheck, Eye, Copyright, Alien }
  },
})
</script>
