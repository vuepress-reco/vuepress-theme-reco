import { createPage } from '@vuepress/core'
import type { App, Page } from '@vuepress/core'
import { isEmptyPlainObject, convertToPinyin } from '@vuepress-reco/shared'
import {
  CategoryPageData,
  CategoryPageOptions,
  CategoryPaginationPost,
  FrontmatterKey,
  ItemKey,
  OrdinaryPageOptions,
  PageOptions,
  PagePluginOptions,
  ReleasedPage,
} from '../types'

// 获取时间的数字类型
export function formatDate (date) {
  const dateNum = !date ? 0 : new Date(date).getTime()
  return dateNum
}

// 比对时间
export function compareDate (prev, next) {
  const prevDate = formatDate(prev.frontmatter.date)
  const nextDate = formatDate(next.frontmatter.date)

  if (prevDate === 0 || nextDate === 0) return 0

  return nextDate - prevDate
}

export default class PageCreater {
  app: App
  options: PagePluginOptions
  private blogsToBeReleased: Array<ReleasedPage>
  private categoryPageData: CategoryPageData
  private _extendedPages: Promise<Page>[]
  private frontmatterKeys: FrontmatterKey[]

  constructor(options: PagePluginOptions, app: App) {
    this.app = app
    this.options = options
    this.blogsToBeReleased = []
    this.categoryPageData = {}
    this._extendedPages = []
    this.frontmatterKeys = []
  }

  parse() {
    this.parseChineseInPagePathToPinyin()
    this.parsePageOptions()
    this.setBlogsToCategoryPageData()
    this.createExtendedPages()
  }

  // 将 path 中的中文转换成拼音
  private parseChineseInPagePathToPinyin() {
    this.app.pages = this.app.pages.map((page: Page) => {
      page.path = convertToPinyin(decodeURIComponent(page.path))
      return page
    })
  }

  // 解析 page 配置
  private parsePageOptions() {
    this.options.forEach((option: PageOptions) => {
      if ((option as CategoryPageOptions).type === 'category') {
        this._parseCategoryPageOptions(option as CategoryPageOptions)
      } else {
        this._parseOrdinaryPageOptions(option)
      }
    })
  }

  // 解析分类页面的配置
  private _parseCategoryPageOptions(option: CategoryPageOptions): void {
    const {
      frontmatterKey: key,
      pageSize,
      layout,
    } = option as CategoryPageOptions

    this.frontmatterKeys.push(key)

    this.categoryPageData[key] = {
      pageSize: pageSize || 10, // 分页默认为 10
      items: {},
      layout,
    }
  }

  // 解析常规页面的配置
  private _parseOrdinaryPageOptions(option: OrdinaryPageOptions):void {
    const { path, layout } = option
    const page = createPage(this.app, {
      frontmatter: { layout },
      path: convertToPinyin(path),
    })

    this._extendedPages.push(page)
  }

  // 将博客页面注入进分类页面数据
  private setBlogsToCategoryPageData(): void {
    // @ts-ignore
    const { autoSetBlogCategories } = this.app.options.theme

    const blogsToBeReleased = this.app.pages
      .filter((page: Page) => {
        const publishFlag = !(
          !/.+\/blogs\/(.+)\/.+\.md$/.test(page.filePath || '')
            || page?.frontmatter?.publish === false
            || page?.title === ''
          )

        if (autoSetBlogCategories && publishFlag) {
          this._setBlogCategories(page)
        }

        return publishFlag
      })
      .sort((prev, next) => {
        const prevSticky = prev.frontmatter.sticky as number
        const nextSticky = next.frontmatter.sticky as number

        if (prevSticky && nextSticky) {
          return prevSticky == nextSticky ? compareDate(prev, next) : (prevSticky - nextSticky)
        } else if (prevSticky && !nextSticky) {
          return -1
        } else if (!prevSticky && nextSticky) {
          return 1
        } else {
          return compareDate(prev, next)
        }
      })
      .map((page: Page) => {
        const { title, frontmatter, excerpt, path } = page
        return { title, frontmatter, excerpt, path }
      })

    this.blogsToBeReleased = blogsToBeReleased

    blogsToBeReleased.forEach((page: ReleasedPage, index) => {
      const categoryKeysOfFrontmatter = Object.keys(page.frontmatter).filter(
        (key: string) => {
          return this.frontmatterKeys.includes(key)
        }
      )

      categoryKeysOfFrontmatter.forEach((key: FrontmatterKey) => {
        const valueOfCurrentKey = page.frontmatter[key]
        const categoryValues = Array.isArray(valueOfCurrentKey) ? valueOfCurrentKey : [valueOfCurrentKey]

        if (isEmptyPlainObject(this.categoryPageData[key].items)) {
          this.categoryPageData[key].items = categoryValues.reduce(
            (prev, current) => {
              prev[convertToPinyin(current)] = {
                pages: [page],
                length: 1,
                label: current
              }
              return prev
            },
            {}
          )
        } else {
          categoryValues?.map(value => String(value)).forEach((value: ItemKey) => {
            if (!value) return

            const categoryPageDataItem = this.categoryPageData[key].items[convertToPinyin(value)]

            if (!categoryPageDataItem) {
              this.categoryPageData[key].items[convertToPinyin(value)] = {
                pages: [page],
                length: 1,
                label: value
              }
            } else {
              const { pages, length, label } = categoryPageDataItem
              this.categoryPageData[key].items[convertToPinyin(value)] = {
                length: length + 1,
                pages: [...pages, page],
                label
              }
            }
          })
        }
      })
    })
  }

  // 所有拓展的页面
  private createExtendedPages(){
    this._createCategoryPaginationPages()
    this._createBlogPaginationPages()
  }

  // 生成分类的分页页面
  private _createCategoryPaginationPages(): void {
    this.frontmatterKeys.forEach((key: string) => {
      const { items, layout, pageSize } = this.categoryPageData[key]
      const categoryValues = Object.keys(items)

      categoryValues.forEach(
        (value, index) => {
          const totalCount = items[convertToPinyin(value)].length
          const totalPage = Math.ceil(totalCount / pageSize)

          Array.from({ length: totalPage }).forEach((item, currentPage) => {
            const page = createPage(this.app, {
              path: `/${key}/${convertToPinyin(value)}/${currentPage + 1}/`,
              frontmatter: { layout },
            })
            this._extendedPages.push(page)
          })
        }
      )
    })
  }

  // 生成博客的分页页面
  private _createBlogPaginationPages() {
    const totalPages = Math.ceil(this.blogsToBeReleased.length / 10)

    Array.from({ length: totalPages }).map((item, index) => {
      const page = createPage(this.app, {
        path: `/posts/${index + 1}/`,
        frontmatter: { layout: 'Post' },
      })
      this._extendedPages.push(page)
    })
  }

  // 设置类别
  private _setBlogCategories(page) {
    const blogCategory = ((page.filePath || '') as string).match(/.+\/blogs\/(.+)\/.+\.md$/)
    if (blogCategory) page.frontmatter.categories = [blogCategory[1]]
  }

  // 所有拓展的页面
  get extendedPages(): Promise<Page>[] {
    return this._extendedPages
  }

  get categoryPaginationPosts(): Record<
    string,
    CategoryPaginationPost
  > {
    let data = {}

    this.frontmatterKeys.forEach((key: string) => {
      const { items, pageSize } = this.categoryPageData[key]
      const categoryValues = Object.keys(items)

      categoryValues.forEach((value: string) => {
        const { length, pages } = items[value]
        const totalPage = Math.ceil(length / pageSize)

        const paginationDataOfValue = Array.from({
          length: totalPage,
        }).reduce(
          (
            prev: Record<string, CategoryPaginationPost>,
            current,
            index
          ) => {
            const currentPage = index + 1

            prev[`/${key}/${convertToPinyin(value)}/${currentPage}/`] = {
              pageSize,
              totalPage: pages.length,
              currentPage,
              currentCategoryKey: key,
              currentCategoryValue: value,
              pages: pages.slice(pageSize * (currentPage - 1), pageSize * currentPage)
            }
            return prev
          },
          {}
        )

        data = { ...data, ...paginationDataOfValue }
      })
    })

    return data
  }

  get categorySummary(): CategoryPageData {
    return this.categoryPageData
  }

  get posts() {
    return this.blogsToBeReleased
  }
}
