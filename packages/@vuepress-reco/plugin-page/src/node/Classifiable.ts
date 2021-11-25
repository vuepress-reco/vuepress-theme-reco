import { createPage } from '@vuepress/core'
import type { App, Page } from '@vuepress/core'
import { isEmptyPlainObject } from '@vuepress-reco/core'
import {
  ClassificationPaginationPost,
  ClassificationPageOptions,
  ClassificationData,
  PagePluginOptions,
  FrontmatterKey,
  PageOptions,
  ItemKey,
} from '../../types'

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
  resolveKeyValue(app: App): void {
    this.app = app
    this.app.pages.forEach((page: Page) => {
      if (
        page?.frontmatter?.home === true ||
        page?.frontmatter?.publish === false ||
        page?.title === ''
      ) {
        return
      }

      this.publishPosts.push(page)

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
              total[current] = {
                pages: [page],
                length: 1,
              }
              return total
            },
            {}
          )
        } else {
          values.forEach((value: ItemKey) => {
            if (!this.classificationData[key].items[value]) {
              this.classificationData[key].items[value] = {
                pages: [page],
                length: 1,
              }
            } else {
              const { pages: p, length } =
                this.classificationData[key].items[value]
              this.classificationData[key].items[value] = {
                length: length + 1,
                pages: [...p, page],
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
          const num = items[value].length
          const pageSize = Math.ceil(num / pagination)

          const pages = Array.from({ length: pageSize }).map((item, index) => {
            return createPage(this.app, {
              path: `/${key}/${value}/${index + 1}/`,
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
          path,
        }),
      ]
    }
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
            total[`/${key}/${value}/${currentPage}/`] = {
              pageSize: pagination,
              total: pages.length,
              currentPage,
              currentClassificationKey: key,
              currentClassificationValue: value,
              pages:
                index < pageSize - 1
                  ? pages.slice(pagination * (pageSize - 1), pagination)
                  : pages.slice(pagination * (pageSize - 1)),
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
