import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { usePageData } from '@vuepress/client'
import type { PageHeader } from '@vuepress/client'
import type { ResolvedSidebarItem } from '../../types'

export interface ResolvedPageHeader {
  [prop: string]: any
}

export type PageHeadersRef = ComputedRef<ResolvedPageHeader[]>

export const pageHeadersSymbol: InjectionKey<PageHeadersRef> =
  Symbol('pageHeaders')

export const usePageHeaders = (): PageHeadersRef => {
  const pageHeaders = inject(pageHeadersSymbol)
  if (!pageHeaders) {
    throw new Error('usePageHeaders() is called without provider.')
  }
  return pageHeaders
}

export function resolvePageHeaders(): any {
  const page = usePageData()
  // if the sidebar item is current page and children is not set
  // use headers of current page as children
  return headersToSidebarItemChildren(page.value.headers, 2)
}

export const headerToSidebarItem = (
  header: PageHeader,
  sidebarDepth: number
): ResolvedSidebarItem => ({
  text: header.title,
  link: `#${header.slug}`,
  children: headersToSidebarItemChildren(header.children, sidebarDepth),
})

export const headersToSidebarItemChildren = (
  headers: PageHeader[],
  sidebarDepth: number
): ResolvedSidebarItem[] =>
  sidebarDepth > 0
    ? headers.map((header) => headerToSidebarItem(header, sidebarDepth - 1))
    : []
