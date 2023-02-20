<template>
  <RouterLink
    v-if="isRouterLink"
    class="link"
    :class="{ 'router-link-active': isActiveInSubpath }"
    :to="item.link"
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

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteLocaleData, useRouteLocale } from '@vuepress/client'
import { isLinkHttp, isLinkMailto, isLinkTel } from '@vuepress/shared'
import type { NavLink } from '../../types'
import { useThemeLocaleData } from '../composables'

export default defineComponent({
  name: 'Link',

  inheritAttrs: false,

  props: {
    item: {
      type: Object as PropType<NavLink>,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute()
    const routeLocale = useRouteLocale()
    const siteLocal = useSiteLocaleData()
    const themeLocal = useThemeLocaleData()

    const { item } = toRefs(props)

    // if the link has http protocol
    const hasHttpProtocol = computed(() => isLinkHttp(item.value.link))
    // if the link has non-http protocol
    const hasNonHttpProtocal = computed(
      () => isLinkMailto(item.value.link) || isLinkTel(item.value.link)
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

    // should be active when current route is a subpath of this link
    const shouldBeActiveInSubpath = computed(() => {
      const localeKeys = Object.keys(siteLocal.value.locales)
      if (localeKeys.length) {
        return !localeKeys.some((key) => key === item.value.link)
      }
      return item.value.link !== themeLocal.value.home || routeLocale.value
    })
    // if this link is active in subpath
    const isActiveInSubpath = computed(() => {
      if (!isRouterLink.value || !shouldBeActiveInSubpath.value) {
        return false
      }
      return route.path.startsWith(item.value.link)
    })

    return {
      isActiveInSubpath,
      isBlankTarget,
      isRouterLink,
      linkRel,
      linkTarget,
      linkAriaLabel,
    }
  },
})
</script>
