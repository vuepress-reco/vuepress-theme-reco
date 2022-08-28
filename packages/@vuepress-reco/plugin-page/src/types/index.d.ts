export type CategoryPageOptions = {
  type: 'category'
  frontmatterKey: string
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

export type CategoryPageData = Record<
  string,
  {
    layout: string
    pageSize: number
    extendedPages: any[]
    items: Record<
      ItemKey,
      {
        pages: any[]
        length: number,
        label: string
      }
    >
  }
>

export type FrontmatterKey = string

export type CategoryPaginationPost = {
  pageSize: number
  totalPage: number
  currentPage: number
  currentCategoryKey: string
  currentCategoryValue: string
  pages: any[]
}
