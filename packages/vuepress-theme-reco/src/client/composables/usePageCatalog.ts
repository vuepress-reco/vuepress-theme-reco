import { computed, inject, type ComputedRef, type InjectionKey } from 'vue'
import { usePageFrontmatter, type PageHeader } from 'vuepress/client'

import type { ResolvedSeriesItem } from '../../types'

export interface ResolvedPageCatalog {
  [prop: string]: any
}

export type CatalogRef = ComputedRef<ResolvedPageCatalog[]>

export const catalogSymbol: InjectionKey<CatalogRef> = Symbol('catalog')

export const usePageCatalog = (): {
  catalog: CatalogRef,
  isShowCatalog: ComputedRef<boolean>
} => {
  const frontmatter = usePageFrontmatter()
  const catalog = inject(catalogSymbol)
  if (!catalog) {
    throw new Error('usePageCatalog() is called without provider.')
  }

  const isShowCatalog = computed(
    () => catalog.value.length > 0 && frontmatter.value.home !== true
  )

  return { catalog, isShowCatalog }
}

const headerToCatalogItem = (header: PageHeader): ResolvedSeriesItem => ({
  text: header.title,
  link: `#${header.slug}`,
  level: header.level,
  children: headersToCatalog(header.children),
})

export const headersToCatalog = (headers: PageHeader[]): ResolvedSeriesItem[] =>
  headers.map((header) => headerToCatalogItem(header))
