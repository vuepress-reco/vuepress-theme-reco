import type { Theme, ThemeConfig } from '@vuepress/core'
import { StyleOptions } from '../types/'

export const defineStyle = (
  options: (themeConfig: Record<string, any>) => StyleOptions
): Theme<ThemeConfig> => {
  return (themeConfig) => {
    const { pages, plugins, ...otherCustomOptions } = options(themeConfig)

    return {
      plugins: [['@vuepress-reco/page', pages || []], ...plugins],
      ...otherCustomOptions,
    }
  }
}
