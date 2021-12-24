export type ClassificationPageOptions = {
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

export type PageOptions = ClassificationPageOptions | OrdinaryPageOptions

export type PagePluginOptions = Array<PageOptions>

export type ItemKey = string

export type ClassificationData = Record<
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

export type ClassificationPaginationPost = {
  pageSize: number
  total: number
  currentPage: number
  currentClassificationKey: string
  currentClassificationValue: string
  pages: any[]
}
