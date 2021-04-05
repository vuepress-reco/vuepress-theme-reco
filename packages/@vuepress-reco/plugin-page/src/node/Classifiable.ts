import { createPage } from '@vuepress/core'
import type { App, Page } from '@vuepress/core'
import { PagePluginOption } from '../../types'
export default class Classifiable {
  private classificationData: any = {}
  private frontmatterKeys: string[] = []
  options: PagePluginOption[]
  app: App

  constructor(options: PagePluginOption[], app: App) {
    this.options = options
    this.app = app

    this.init()
  }

  // 初始化
  init(): void {
    this.options.forEach((option: PagePluginOption) => {
      if (option.type === 'frontmatter') {
        const { frontmatterKey: key, layout, pagination } = option

        this.frontmatterKeys.push(key as string)
        this.classificationData[key as string] = {
          layout,
          pagination,
          extendPages: [],
        }
      }
    })
  }

  // 解析 key-value 对应的数量
  resolveKeyValue(): void {
    this.app.pages.forEach((page: Page) => {
      const frontmatterRecoKeys = Object.keys(page.frontmatter).filter(
        (key: string) => {
          return /^reco-.+/.test(key)
        }
      )

      frontmatterRecoKeys.forEach((key: string) => {
        const values = page.frontmatter[key] as string[]
        if (!this.classificationData[key].items) {
          this.classificationData[key].items = values.reduce(
            (total, current) => {
              total[current] = {
                length: 1,
                pages: [page],
              }
              return total
            },
            {}
          )
        } else {
          values.forEach((value: string) => {
            if (!this.classificationData[key].items[value]) {
              this.classificationData[key].items[value] = {
                length: 1,
                pages: [page],
              }
            } else {
              const { pages: p, length } = this.classificationData[key].items[
                value
              ]
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
      const realKey = key.slice(5)
      const { items, layout, pagination } = this.classificationData[key]
      const valuesOfKey = Object.keys(items)

      this.classificationData[key].extendPages = valuesOfKey.reduce(
        (total: any[], value: string) => {
          const num = items[value].length
          const pageSize = Math.ceil(num / pagination)

          const pages = Array.from({ length: pageSize }).map((item, index) => {
            return createPage(this.app, {
              path: `/${realKey}/${value}/${index + 1}/`,
              frontmatter: { layout },
            })
          })

          return [...total, ...pages]
        },
        []
      )
    })
  }

  private resolvePagesByPagePluginOption(
    option: PagePluginOption
  ): Promise<Page>[] {
    const { path, layout, type, frontmatterKey } = option
    if (type === 'frontmatter') {
      return this.classificationData[frontmatterKey as string].extendPages
    } else {
      return [
        createPage(this.app, {
          path,
          frontmatter: { layout },
        }),
      ]
    }
  }

  get extendPages(): any[] {
    const extendedPages = this.options.reduce((total: any[], option) => {
      const classificationPages = this.resolvePagesByPagePluginOption(option)
      return [...total, ...classificationPages]
    }, [])

    return extendedPages
  }

  get pageDataOfExtendedPages(): Record<string, any> {
    let data = {}

    this.frontmatterKeys.forEach((key: string) => {
      const realKey = key.slice(5)
      const { items, pagination } = this.classificationData[key]
      const valuesOfKey = Object.keys(items)

      valuesOfKey.forEach((value: string) => {
        const { length, pages } = items[value]
        const pageSize = Math.ceil(length / pagination)

        const paginationDataOfValue = Array.from({
          length: pageSize,
        }).reduce((total: Record<string, any>, current, index) => {
          const currentPage = index + 1
          total[`/${realKey}/${value}/${currentPage}/`] = {
            pageSize: pagination,
            total: pages.length,
            currentPage,
            pages:
              index < pageSize - 1
                ? pages.slice(pagination * (pageSize - 1), pagination)
                : pages.slice(pagination * (pageSize - 1)),
          }
          return total
        }, {})

        data = { ...data, ...paginationDataOfValue }
      })
    })

    return data
  }
}
