<template>
  <RouterLink
    v-if="isRouterLink"
    class="link"
    :to="item.link as string"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
    :key="`${item.link}-router`"
  >
    <slot name="before" />
    <Xicons :icon="item.icon" :text="item.text" />
    <slot name="after" />
  </RouterLink>

  <a
    v-else
    class="link"
    :href="item.link"
    :target="linkTarget"
    :rel="linkRel"
    :aria-label="linkAriaLabel"
    v-bind="$attrs"
    :key="`${item.link}-a`"
  >
    <slot name="before" />
    <Xicons :icon="item.icon" :text="item.text" />
    <ExternalLinkIcon v-if="isBlankTarget" />
    <slot name="after" />
  </a>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, toRefs } from 'vue'
import { isLinkHttp, isLinkWithProtocol } from 'vuepress/shared'
import { useSiteLocaleData, useRouteLocale } from 'vuepress/client'

import { useThemeLocaleData } from '@composables/index.js'

import type { PropType } from 'vue'
import type { NavLink, ResolvedSeriesItem } from '../../types'


const route = useRoute()
const routeLocale = useRouteLocale()
const siteLocal = useSiteLocaleData()
const themeLocal = useThemeLocaleData()

interface LinkItem extends NavLink {
  [key: string]: unknown
}

const props = defineProps({
  item: {
    type: Object as PropType<NavLink | ResolvedSeriesItem>,
    required: true,
  },
})
const { item } = toRefs(props)

// if the link has http protocol
const hasHttpProtocol = computed(() => isLinkHttp(item.value.link as string))
// if the link has non-http protocol
const hasNonHttpProtocal = computed(
  () => !hasHttpProtocol.value && isLinkWithProtocol(item.value.link as string || '')
)
// resolve the `target` attr
const linkTarget = computed(() => {
  if (hasNonHttpProtocal.value) return undefined
  if (item.value.target) return item.value.target
  if (hasHttpProtocol.value) return '_blank'
  return undefined
})
// if the `target` attr is '_blank'
const isBlankTarget = computed(() => linkTarget.value === '_blank')
// is `<RouterLink>` or not
const isRouterLink = computed(
  () =>
    !hasHttpProtocol.value &&
    !hasNonHttpProtocal.value &&
    !isBlankTarget.value
)

// resolve the `rel` attr
const linkRel = computed(() => {
  if (hasNonHttpProtocal.value) return undefined
  if (item.value.rel) return item.value.rel
  if (isBlankTarget.value) return 'noopener noreferrer'
  return undefined
})
// resolve the `aria-label` attr
const linkAriaLabel = computed(
  () => item.value.ariaLabel || item.value.text
)
</script>
