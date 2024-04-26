import { PageFrontmatter } from 'vuepress/client'

export type CategoryPageOptions = {
  type: 'category'
  frontmatterKey: CategoryKey
  path: string
  layout: string
  pageSize?: number
}

export type OrdinaryPageOptions = {
  path: string
  layout: string
}

export type PageOptions = CategoryPageOptions | OrdinaryPageOptions

export type PagePluginOptions = Array<PageOptions>

export type ItemKey = string

export type ReleasedPage = {
  title: string
  frontmatter: PageFrontmatter
  path: string
}

export type CategoryPageData = Record<
  string,
  {
    layout: string
    pageSize: number
    items: Record<
      ItemKey,
      {
        pages: ReleasedPage[]
        length: number
        label: string
        categoryValue: string
      }
    >
  }
>

export type CategoryKey = string

export type CategoryPaginationPost = {
  pageSize: number
  totalPage: number
  currentPage: number
  currentCategoryKey: string
  currentCategoryValue: string
  pages: any[]
}
