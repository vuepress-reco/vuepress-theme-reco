export type CategoryPageOptions = {
  type: 'frontmatter'
  frontmatterKey: string
  path: string
  layout: string
  pagination?: number
}

export type OrdinaryPageOptions = {
  path: string
  layout: string
}

export type PageOptions = CategoryPageOptions | OrdinaryPageOptions

export type PagePluginOptions = Array<PageOptions>

export type ItemKey = string

export type CategoryData = Record<
  string,
  {
    layout: string
    pagination: number
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
  total: number
  currentPage: number
  currentCategoryKey: string
  currentCategoryValue: string
  pages: any[]
}
