import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { usePageData } from '@vuepress/client'
import type { PageHeader } from '@vuepress/client'
import type { ResolvedSeriesItem } from '../../types'

export interface ResolvedPageCatalog {
  [prop: string]: any
}

export type CatalogRef = ComputedRef<ResolvedPageCatalog[]>

export const catalogSymbol: InjectionKey<CatalogRef> = Symbol('catalog')

export const usePageCatalog = (): CatalogRef => {
  const catalog = inject(catalogSymbol)
  if (!catalog) {
    throw new Error('usePageCatalog() is called without provider.')
  }
  return catalog
}

export function resolveCatalog(): any {
  const page = usePageData()
  // if the series item is current page and children is not set
  // use headers of current page as children
  return headersToCatalog(page.value.headers)
}

const headerToCatalogItem = (header: PageHeader): ResolvedSeriesItem => ({
  text: header.title,
  link: `#${header.slug}`,
  level: header.level,
  children: headersToCatalog(header.children),
})

export const headersToCatalog = (headers: PageHeader[]): ResolvedSeriesItem[] =>
  headers.map((header) => headerToCatalogItem(header))
