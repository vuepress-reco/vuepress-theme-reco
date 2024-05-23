import { createPage, type App, type Page } from 'vuepress/core'
import { isEmptyPlainObject, convertToPinyin, removeEmptyString } from '@vuepress-reco/shared'
import {
  ItemKey,
  PageOptions,
  ReleasedPage,
  CategoryKey,
  CategoryPageData,
  PagePluginOptions,
  CategoryPageOptions,
  OrdinaryPageOptions,
  CategoryPaginationPost,
} from '../types'

export default class PageCreater {
  app: App
  options: PagePluginOptions
  themeConfig: Record<string, unknown>

  private __series__: Record<string, any>
  private __extendedPages__: Promise<Page>[]
  private __category_keys__: CategoryKey[]
  private __category_page_data__: CategoryPageData
  private __blogs_to_be_released__: Array<ReleasedPage>

  constructor(
    app: App,
    options: PagePluginOptions,
    themeConfig: Record<string, unknown>
  ) {
    this.app = app
    this.options = options
    this.themeConfig = themeConfig

    this.__series__ = {}
    this.__extendedPages__ = []
    this.__category_keys__ = []
    this.__category_page_data__ = {}
    this.__blogs_to_be_released__ = []
  }

  get posts() {
    return this.__blogs_to_be_released__
  }

  get series() {
    return this.__series__
  }

  // 所有拓展的页面
  get extendedPages(): Promise<Page>[] {
    return this.__extendedPages__
  }

  get categorySummary(): CategoryPageData {
    return this.__category_page_data__
  }

  get categoryPaginationPosts(): Record<string, CategoryPaginationPost> {
    let paginationData = {}

    this.__category_keys__.forEach((categoryKey: CategoryKey) => {
      const { items, pageSize } = this.__category_page_data__[categoryKey]
      const categoryValues = Object.keys(items)

      categoryValues.forEach((categoryValue: string) => {
        const { length, pages } = items[categoryValue]
        const totalPage = Math.ceil(length / pageSize)

        const paginationDataOfCategoryValue = Array.from({ length: totalPage }).reduce(
          (prev: Record<string, CategoryPaginationPost>, current, index) => {
            const currentPage = index + 1
            const startIdx = pageSize * (currentPage - 1)
            const endIdx = pageSize * currentPage

            prev[`/${categoryKey}/${categoryValue}/${currentPage}.html`] = {
              pageSize,
              currentPage,
              totalPage: pages.length,
              currentCategoryKey: categoryKey,
              currentCategoryValue: categoryValue,
              pages: pages.slice(startIdx, endIdx),
            }

            return prev
          },
          {}
        )

        paginationData = { ...paginationData, ...paginationDataOfCategoryValue }
      })
    })

    return paginationData
  }

  parse() {
    this._parsePageOptions()

    this._setBlogsToCategoryPageData()

    this._createExtendedPages()

    /**
     * The name of the file is changed in the develop environment,
     * and bug of 404 appears during hot updates.
     */
    //
    if (this.app.env.isBuild) {
      this._parseChineseInPagePathToPinyin()
    }
  }

  // 将 path 中的中文转换成拼音
  private _parseChineseInPagePathToPinyin() {
    this.app.pages = this.app.pages.map((page: Page) => {
      page.path = formatPath(page.path)
      page.data.path = formatPath(page.data.path)
      page.htmlFilePath = formatPath(page.htmlFilePath)
      page.chunkFilePath = formatPath(page.chunkFilePath)
      page.componentFilePath = formatPath(page.componentFilePath)
      page.htmlFilePathRelative = formatPath(page.htmlFilePathRelative)
      page.chunkFilePathRelative = formatPath(page.chunkFilePathRelative)
      page.componentFilePathRelative = formatPath(page.componentFilePathRelative)

      return page
    })
  }

  // 解析 page 配置
  private _parsePageOptions() {
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
      layout,
      pageSize,
      frontmatterKey: categoryKey,
    } = option as CategoryPageOptions

    this.__category_keys__.push(categoryKey)

    this.__category_page_data__[categoryKey] = {
      layout,
      items: {},
      pageSize: pageSize || 10,
    }
  }

  // 解析常规页面的配置
  private _parseOrdinaryPageOptions(option: OrdinaryPageOptions): void {
    const { path, layout } = option
    const page = createPage(this.app, {
      frontmatter: { layout },
      path: formatPath(path),
    })

    this.__extendedPages__.push(page)
  }

  // 将博客页面注入进分类页面数据
  private _setBlogsToCategoryPageData(): void {
    const { autoSetBlogCategories, autoSetSeries } = this.themeConfig || {}

    const blogsToBeReleased = this.app.pages
      .filter((page: Page) => {
        const publishFlag = !(
          !/.+\/blogs\/[(.+)\/]?.+\.md$/.test(page.filePath || '') ||
          page?.frontmatter?.publish === false ||
          page?.title === ''
        )

        if (autoSetBlogCategories && publishFlag) {
          this._setBlogCategories(page)
        }

        if (autoSetSeries) {
          this._setSeries(page)
        }

        return publishFlag
      })
      .sort((prev, next) => {
        const prevSticky = prev.frontmatter.sticky as number
        const nextSticky = next.frontmatter.sticky as number

        if (prevSticky && nextSticky) {
          return prevSticky == nextSticky
            ? compareDate(prev, next)
            : prevSticky - nextSticky
        } else if (prevSticky && !nextSticky) {
          return -1
        } else if (!prevSticky && nextSticky) {
          return 1
        } else {
          return compareDate(prev, next)
        }
      })
      .map((page: Page) => {
        const { title, frontmatter, path } = page
        return { title, frontmatter, path }
      })

    this.__blogs_to_be_released__ = blogsToBeReleased

    blogsToBeReleased.forEach((page: ReleasedPage) => {
      const categoryKeysOfFrontmatter = Object.keys(page.frontmatter)
        .filter((key: string) => {
          return this.__category_keys__.includes(key)
        }
      )

      categoryKeysOfFrontmatter.forEach((key: CategoryKey) => {
        const valueOfCurrentKey = page.frontmatter[key]
        const categoryValues = Array.isArray(valueOfCurrentKey)
          ? valueOfCurrentKey
          : [valueOfCurrentKey]

        if (isEmptyPlainObject(this.__category_page_data__[key].items)) {
          this.__category_page_data__[key].items = categoryValues.reduce(
            (total, categoryValue) => {
              const itemKey = formatCategory(categoryValue)

              total[itemKey] = {
                length: 1,
                pages: [page],
                label: categoryValue,
                categoryValue: itemKey,
              }
              return total
            },
            {}
          )
        } else {
          categoryValues
            .forEach((categoryValue: ItemKey) => {
              if (!categoryValue) return

              const itemKey = formatCategory(categoryValue)
              const categoryPageDataItem =
                this.__category_page_data__[key].items[itemKey]

              if (!categoryPageDataItem) {
                this.__category_page_data__[key].items[itemKey] = {
                  length: 1,
                  pages: [page],
                  label: categoryValue,
                  categoryValue: itemKey,
                }
              } else {
                const { pages, length, label } = categoryPageDataItem
                this.__category_page_data__[key].items[itemKey] = {
                  label,
                  length: length + 1,
                  categoryValue: itemKey,
                  pages: [...pages, page],
                }
              }
            })
        }
      })
    })
  }

  // 所有拓展的页面
  private _createExtendedPages() {
    this._createCategoryPaginationPages()
    this._createBlogPaginationPages()
  }

  // 生成分类的分页页面
  private _createCategoryPaginationPages(): void {
    this.__category_keys__.forEach((key: string) => {
      const { items, layout, pageSize } = this.__category_page_data__[key]
      const categoryValues = Object.keys(items)

      categoryValues.forEach((value, index) => {
        const totalCount = items[formatCategory(value)].length
        const totalPage = Math.ceil(totalCount / pageSize)

        Array.from({ length: totalPage }).forEach((item, currentPage) => {
          const page = createPage(this.app, {
            path: `/${key}/${formatCategory(value)}/${currentPage + 1}.html`,
            frontmatter: { layout },
          })
          this.__extendedPages__.push(page)
        })
      })
    })
  }

  // 生成博客的分页页面
  private _createBlogPaginationPages() {
    const totalPages = Math.ceil(this.__blogs_to_be_released__.length / 10)

    Array.from({ length: totalPages }).map((item, index) => {
      const page = createPage(this.app, {
        path: `/posts/${index + 1}.html`,
        frontmatter: { layout: 'Posts' },
      })
      this.__extendedPages__.push(page)
    })
  }

  // 设置类别
  private _setBlogCategories(page) {
    const blogCategory = ((page.filePath || '') as string).match(
      /.+\/blogs\/(.+)\/.+\.md$/
    )
    if (blogCategory) page.frontmatter.categories = [blogCategory[1]]
  }

  // 设置系列
  private _setSeries(page) {
    let matches = ((page.filePath || '') as string).match(
      /\/series\/([^/]+)(\S*?)\/([^/.]+)\.md/
    )

    if (!matches) return

    const [filePath, sery, dirStr] = matches
    const seryKey = `/series/${sery}/`

    if (!this.__series__?.[seryKey]) {
      this.__series__[seryKey] = []
    }

    const dirs = dirStr.split('/').splice(1)
    const dirLen = dirs.length
    if (dirLen === 0) {
      this.__series__[seryKey].push(filePath)
      return
    }
    dirs.reduce((total, current, index) => {
      if (!total.some((groupItem) => groupItem?.text === current)) {
        total.push({
          text: current,
          children: index === dirLen - 1 ? [filePath] : [],
        })
      } else {
        total.find((groupItem) => groupItem?.text === current).children.push(index === dirLen - 1 ? filePath : {
          text: current,
          children: index === dirLen - 1 ? [filePath] : [],
        })
      }

      return total
    }, this.__series__[seryKey])
  }
}

// 获取时间的数字类型
function formatDate(date) {
  const dateNum = !date ? 0 : new Date(date).getTime()
  return dateNum
}

// 比对时间
function compareDate(prev, next) {
  const prevDate = formatDate(prev.frontmatter.date)
  const nextDate = formatDate(next.frontmatter.date)

  if (prevDate === 0 || nextDate === 0) return 0

  return nextDate - prevDate
}

function formatCategory(category: string) {
  return convertToPinyin(removeEmptyString(category))
}

function formatPath(path: string) {
  return convertToPinyin(decodeURIComponent(path))
}
