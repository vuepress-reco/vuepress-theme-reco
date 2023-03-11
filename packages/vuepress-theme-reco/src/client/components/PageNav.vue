<template>
  <nav v-if="prevNavLink || nextNavLink" class="page-nav">
    <p class="inner" :class="{ hasPrev: !!prevNavLink, hasNext: !!nextNavLink }">
      <span v-if="prevNavLink" class="page-nav-item prev" @click="go(prevNavLink.link)">
        ←
        {{prevNavLink.text}}
      </span>

      <span v-if="nextNavLink" class="page-nav-item next" @click="go(nextNavLink.link)">
        {{nextNavLink.text}}
        →
      </span>
    </p>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePageFrontmatter } from '@vuepress/client'
import { isPlainObject, isString } from '@vuepress/shared'
import type {
  RecoThemeNormalPageFrontmatter,
  NavLink as NavLinkType,
  ResolvedSeriesItem,
} from '../../types'
import { useNavLink, useSeriesItems } from '../composables'
import Link from './Link.vue'

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  conf: unknown
): null | false | NavLinkType => {
  if (conf === false) {
    return null
  }

  if (isString(conf)) {
    return useNavLink(conf)
  }

  if (isPlainObject<NavLinkType>(conf)) {
    return conf
  }

  return false
}

/**
 * Resolve `prev` or `next` config from series items
 */
const resolveFromSeriesItems = (
  seriesItems: ResolvedSeriesItem[],
  currentPath: string,
  offset: number
): null | NavLinkType => {
  const index = seriesItems.findIndex((item) => item.link === currentPath)
  if (index !== -1) {
    const targetItem = seriesItems[index + offset]
    if (!targetItem?.link) {
      return null
    }
    return targetItem as NavLinkType
  }

  for (const item of seriesItems) {
    if (item.children) {
      const childResult = resolveFromSeriesItems(
        item.children,
        currentPath,
        offset
      )
      if (childResult) {
        return childResult
      }
    }
  }

  return null
}

export default defineComponent({
  name: 'PageNav',

  components: { Link },

  setup() {
    const frontmatter = usePageFrontmatter<RecoThemeNormalPageFrontmatter>()
    const seriesItems = useSeriesItems()
    const route = useRoute()
    const router = useRouter()

    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev)
      if (prevConfig !== false) {
        return prevConfig
      }

      return resolveFromSeriesItems(seriesItems.value, route.path, -1)
    })

    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next)
      if (nextConfig !== false) {
        return nextConfig
      }

      return resolveFromSeriesItems(seriesItems.value, route.path, 1)
    })

    const go = (link) => {
      router.push(link)
    }

    return {
      prevNavLink,
      nextNavLink,
      go
    }
  },
})
</script>
