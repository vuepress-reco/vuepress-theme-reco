import type { Theme, ThemeConfig } from '@vuepress/core'
import { StyleOptions } from '../types/'

export const defineStyle = (options: StyleOptions): Theme<ThemeConfig> => {
  return ({ themePlugins = {}, ...localeOptions }) => {
    const { pages, ...otherCustomOptions } = options

    return {
      plugins: [['@vuepress-reco/page', pages || []]],
      ...otherCustomOptions,
    }
  }
}
