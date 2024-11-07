<template>
  <nav v-if="navbarConfig.length || socialLinks.length || navbarSelectLanguage" class="navbar-links">
    <div v-for="(item, index) in navbarConfig" :key="index" class="navbar-links__item">
      <template v-if="'children' in item && item.children">
        <DropdownLink :item="item" />
      </template>

      <template v-else>
        <Link :item="(item as MenuLink)" />
      </template>
    </div>

    <DropdownLink
      v-if="navbarSelectLanguage"
      :class="{
        'navbar-links__item': true,
        'language': !isMobile
      }"
      :item="navbarSelectLanguage"
    />

    <ToggleDarkModeButton
      v-if="!isMobile && (themeLocal.colorModeSwitch ?? true)"
      class="btn--dark-mode navbar-links__item"
    />

    <ul class="social-links navbar-links__item">
      <li
        class="social-item"
        v-for="(item, index) in socialLinks"
        :key="index"
        @click="jumpSocialLink(item.link)"
      >
        <component :is="item.icon" :style="{ width: '25px', height: '25px' }" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useSocialLinks } from './useSocialLinks.js'
import { useNavbarConfig } from './useNavbarConfig.js'
import { useMobile, useThemeLocaleData } from '@composables/index.js'
import { useNavbarSelectLanguage } from './useNavbarSelectLanguage.js'

import Link from '@components/Link.vue'
import DropdownLink from '@components/DropdownLink/index.vue'
import ToggleDarkModeButton from '@components/ToggleDarkModeButton.vue'

import type { MenuLink } from '../../../types'

const { isMobile } = useMobile()
const navbarConfig = useNavbarConfig()
const themeLocal = useThemeLocaleData()
const navbarSelectLanguage = useNavbarSelectLanguage()
const { socialLinks, jumpSocialLink } = useSocialLinks()
</script>
