import { createPage } from '@vuepress/core'
import type { App, Page } from '@vuepress/core'
import { isEmptyPlainObject, convertToPinyin } from '@vuepress-reco/shared'
import {
  ClassificationPaginationPost,
  ClassificationPageOptions,
  ClassificationData,
  PagePluginOptions,
  FrontmatterKey,
  PageOptions,
  ItemKey,
} from '../types'

// 获取时间的数字类型
export function getTimeNum (date) {
  const dateNum = !date ? 0 : new Date(date).getTime()
  return dateNum
}

// 比对时间
export function compareDate (a, b) {
  const aDateNum = getTimeNum(a.frontmatter.date)
  const bDateNum = getTimeNum(b.frontmatter.date)
  if (aDateNum === 0 || bDateNum === 0) return 0
  return bDateNum - aDateNum
}

export default class Classifiable {
  private classificationData: ClassificationData = {}
  private frontmatterKeys: FrontmatterKey[] = []
  private publishPosts: Array<Page>
  options: PagePluginOptions
  app: App

  constructor(options: PagePluginOptions, app: App) {
    this.options = options
    this.app = app
    this.publishPosts = []

    this.init()
  }

  // 初始化
  init(): void {
    this.options.forEach((option: PageOptions) => {
      if ((option as ClassificationPageOptions).type === 'frontmatter') {
        const {
          frontmatterKey: key,
          pagination,
          layout,
        } = option as ClassificationPageOptions

        this.frontmatterKeys.push(key)

        this.classificationData[key] = {
          pagination: pagination || 10, // 分页默认为 10
          extendedPages: [],
          items: {},
          layout,
        }
      }
    })
  }

  // 解析 key-value 对应的数量
  resolveKeyValue(): void {
    this.app.pages = this.app.pages.map((page: Page) => {
      page.path = convertToPinyin(decodeURIComponent(page.path))
      return page
    })

    const { autoSetCategory } = this.app.options.themeConfig
    const publishPosts = this.app.pages
      .filter((page: Page) => {
        const publishFlag = !(
          page?.frontmatter?.home === true
            || page?.frontmatter?.publish === false
            || page?.title === '')

        if (autoSetCategory && publishFlag) {
          this.setCategory(page)
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
        }

        return compareDate(prev, next)
      })

    this.publishPosts = publishPosts

    publishPosts.forEach((page: Page) => {
      if (
        page?.frontmatter?.home === true ||
        page?.frontmatter?.publish === false ||
        page?.title === ''
      ) {
        return
      }


      const classificationKeys = Object.keys(page.frontmatter).filter(
        (key: string) => {
          return this.frontmatterKeys.includes(key)
        }
      )

      classificationKeys.forEach((key: FrontmatterKey) => {
        const values = page.frontmatter[key] as string[]
        if (isEmptyPlainObject(this.classificationData[key].items)) {
          this.classificationData[key].items = values.reduce(
            (total, current) => {
              total[convertToPinyin(current)] = {
                pages: [page],
                length: 1,
                label: current
              }
              return total
            },
            {}
          )
        } else {
          values?.forEach((value: ItemKey) => {
            if (!this.classificationData[key].items[convertToPinyin(value)]) {
              this.classificationData[key].items[convertToPinyin(value)] = {
                pages: [page],
                length: 1,
                label: value
              }
            } else {
              const { pages: p, length, } =
                this.classificationData[key].items[convertToPinyin(value)]
              this.classificationData[key].items[convertToPinyin(value)] = {
                length: length + 1,
                pages: [...p, page],
                label: value
              }
            }
          })
        }
      })
    })

    this.resolvePages()
  }

  // 根据数量转化成 page 信息
  resolvePages(): void {
    this.frontmatterKeys.forEach((key: string) => {
      const { items, layout, pagination } = this.classificationData[key]
      const valuesOfKey = Object.keys(items)

      this.classificationData[key].extendedPages = valuesOfKey.reduce(
        (total: Promise<Page>[], value: string) => {
          const num = items[convertToPinyin(value)].length
          const pageSize = Math.ceil(num / pagination)

          const pages = Array.from({ length: pageSize }).map((item, index) => {
            return createPage(this.app, {
              path: `/${key}/${convertToPinyin(value)}/${index + 1}/`,
              frontmatter: { layout },
            })
          })

          return [...total, ...pages]
        },
        []
      )
    })
  }

  // 解析 page 配置
  private resolvePageOptions(option: PageOptions): Promise<Page>[] {
    if ((option as ClassificationPageOptions).type === 'frontmatter') {
      return this.classificationData[
        (option as ClassificationPageOptions).frontmatterKey
      ].extendedPages
    } else {
      const { path, layout } = option
      return [
        createPage(this.app, {
          frontmatter: { layout },
          path: convertToPinyin(path),
        }),
      ]
    }
  }

  // 设置类别
  private setCategory(page) {
    const blogCategray = ((page.filePath || '') as string).match(/.+\/blogs\/(.+)\/.+\.md$/)
    if (blogCategray) page.frontmatter.categories = [blogCategray[1]]

    const docCategray = ((page.filePath || '') as string).match(/.+\/docs\/(.+)\/.+\.md$/)
    if (docCategray) page.frontmatter.categories = [docCategray[1]]
  }

  getPublishPostsPage(): Array<Promise<Page>> {
    const pageSize = Math.ceil(this.publishPosts.length / 10)

    const pages = Array.from({ length: pageSize }).map((item, index) => {
      return createPage(this.app, {
        path: `/posts/${index + 1}/`,
        frontmatter: { layout: 'Post' },
      })
    })

    return pages
  }

  // 拓展的页面
  get extendedPages(): Promise<Page>[] {
    const pages = this.options.reduce((total: Promise<Page>[], option) => {
      const classificationPages = this.resolvePageOptions(option)
      return [...total, ...classificationPages]
    }, [])

    const publishPostsPages = this.getPublishPostsPage()

    return [...pages, ...publishPostsPages]
  }

  get classificationPaginationPosts(): Record<
    string,
    ClassificationPaginationPost
  > {
    let data = {}

    this.frontmatterKeys.forEach((key: string) => {
      const { items, pagination } = this.classificationData[key]
      const valuesOfKey = Object.keys(items)

      valuesOfKey.forEach((value: string) => {
        const { length, pages } = items[value]
        const pageSize = Math.ceil(length / pagination)

        const paginationDataOfValue = Array.from({
          length: pageSize,
        }).reduce(
          (
            total: Record<string, ClassificationPaginationPost>,
            current,
            index
          ) => {
            const currentPage = index + 1

            total[`/${key}/${convertToPinyin(value)}/${currentPage}/`] = {
              pageSize: pagination,
              total: pages.length,
              currentPage,
              currentClassificationKey: key,
              currentClassificationValue: value,
              pages:
                index < pageSize - 1
                  ? pages.slice(pagination * index, pagination)
                  : pages.slice(pagination * index)
            }
            return total
          },
          {}
        )

        data = { ...data, ...paginationDataOfValue }
      })
    })

    return data
  }

  get classificationSummary(): ClassificationData {
    return this.classificationData
  }

  get posts() {
    return this.publishPosts
  }
}
