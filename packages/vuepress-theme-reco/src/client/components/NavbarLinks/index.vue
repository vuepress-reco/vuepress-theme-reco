<template>
  <nav v-if="navbarLinks.length" class="navbar-links">
    <div v-for="(item, index) in navbarLinks" :key="index" class="navbar-links__item">
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
      :item="navbarSelectLanguage" />
  </nav>
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from 'vue'

import { useMobile } from '@composables/index.js'
import { useNavbarRepo } from './useNavbarRepo.js'
import { useNavbarConfig } from './useNavbarConfig.js'
import { useNavbarSelectLanguage } from './useNavbarSelectLanguage.js'

import Link from '../Link.vue'
import DropdownLink from '../DropdownLink.vue'

import type {
  MenuLink,
  MenuGroup,
  MenuLinkGroup,
} from '../../../types'

const { isMobile } = useMobile()
const navbarRepo = useNavbarRepo()
const navbarConfig = useNavbarConfig()
const navbarSelectLanguage = useNavbarSelectLanguage()

const navbarLinks: ComputedRef<Array<MenuLink | MenuGroup<MenuLinkGroup>>>
  = computed(() => [
    ...navbarConfig.value,
    ...navbarRepo.value,
  ])
</script>
