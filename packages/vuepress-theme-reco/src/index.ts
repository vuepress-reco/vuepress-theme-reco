import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const recoTheme: Theme<ThemeConfig> = (themeConfig: ThemeConfig) => {
  const { style } = themeConfig
  const stylePath = path.resolve(process.cwd(), `node_modules/${style}`)
  const getStyleConfig = require(path.resolve(`${stylePath}/lib/index.js`))
    .default

  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(
      process.cwd(),
      `node_modules/${style}/lib/client/layouts`
    ),
    ...getStyleConfig(themeConfig),
  }
}

export default recoTheme
