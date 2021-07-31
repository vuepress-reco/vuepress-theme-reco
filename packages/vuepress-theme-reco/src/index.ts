import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const recoTheme: Theme<ThemeConfig> = (themeConfig: ThemeConfig) => {
  const { style } = themeConfig
  const stylePath = path.resolve(process.cwd(), `node_modules/${style}`)
  const getStyleConfig = require(path.resolve(
    `${stylePath}/lib/index.js`
  )).default

  const styleConfig = getStyleConfig(themeConfig)
  styleConfig.plugins = [
    '@vuepress/plugin-git',
    '@vuepress/plugin-search',
    '@vuepress/plugin-prismjs',
    '@vuepress/plugin-docsearch',
    '@vuepress/active-header-links',
    ...styleConfig.plugins,
  ]

  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(
      process.cwd(),
      `node_modules/${style}/lib/client/layouts`
    ),
    ...styleConfig,
  }
}

export default recoTheme
