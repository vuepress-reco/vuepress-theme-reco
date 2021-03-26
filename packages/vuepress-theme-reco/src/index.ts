import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const defaultTheme: Theme<ThemeConfig> = ({
  themePlugins = {},
  ...localeOptions
}) => {
  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(__dirname, './layouts')
  }
}
