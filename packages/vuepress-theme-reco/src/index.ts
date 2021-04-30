import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const recoTheme: Theme<ThemeConfig> = ({
  themePlugins = {},
  ...localeOptions
}) => {
  const { style } = localeOptions
  const stylePath = path.resolve(process.cwd(), `node_modules/${style}`)
  const getStyleConfig = require(path.resolve(`${stylePath}/lib/index.js`))
    .default

  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(
      process.cwd(),
      `node_modules/${style}/lib/client/layouts`
    ),
    ...getStyleConfig({ themePlugins, localeOptions }),
  }
}

export default recoTheme
