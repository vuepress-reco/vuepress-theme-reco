import { computed, inject } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'

import type { PageHeader } from 'vuepress/client'
import type { ComputedRef, InjectionKey } from 'vue'

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

const headerToCatalogItem = (header: PageHeader): ResolvedPageCatalog => ({
  text: header.title,
  link: `#${header.slug}`,
  level: header.level,
  children: headersToCatalog(header.children),
})

export const headersToCatalog = (headers: PageHeader[]): ResolvedPageCatalog[] =>
  headers.map((header) => headerToCatalogItem(header))
