import type { Theme, ThemeConfig } from '@vuepress/core'
import { StyleOptions } from '../types/'

export const defineStyle = (
  options: (
    themePlugins: Record<string, any>,
    localeOptions: Record<string, any>
  ) => StyleOptions
): Theme<ThemeConfig> => {
  return ({ themePlugins, localeOptions }) => {
    const { pages, plugins, ...otherCustomOptions } = options(
      themePlugins,
      localeOptions
    )

    return {
      plugins: [['@vuepress-reco/page', pages || []], ...plugins],
      ...otherCustomOptions,
    }
  }
}
