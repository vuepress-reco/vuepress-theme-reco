import { computed, provide, ref } from 'vue'
import {
  catalogSymbol,
  headersToCatalog,
} from '@composables/index.js'
import { onContentUpdated } from 'vuepress/client'

import type { PageHeader } from 'vuepress/client'

const resolvePageHeaders = (): PageHeader[] => {
  const headers: PageHeader[] = []
  const parents: PageHeader[] = []

  document
    .querySelectorAll<HTMLElement>('.theme-reco-md-content h2, .theme-reco-md-content h3, .theme-reco-md-content h4, .theme-reco-md-content h5, .theme-reco-md-content h6')
    .forEach((element) => {
      if (!element.id) return

      const level = Number(element.tagName.slice(1))
      const header = {
        title: element.textContent?.trim() ?? '',
        slug: element.id,
        link: `#${element.id}`,
        level,
        children: [],
      } as PageHeader

      while (parents.length > 0 && parents[parents.length - 1].level >= level) {
        parents.pop()
      }

      const parent = parents[parents.length - 1]
      if (parent) {
        parent.children.push(header)
      } else {
        headers.push(header)
      }
      parents.push(header)
    })

  return headers
}

export function applyClientSetup() {
  const headers = ref<PageHeader[]>([])
  const catalog = computed(() => headersToCatalog(headers.value))

  onContentUpdated((reason) => {
    headers.value = reason === 'beforeUnmount' ? [] : resolvePageHeaders()
  })

  provide(catalogSymbol, catalog)
}
