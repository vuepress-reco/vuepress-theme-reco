import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { getRecoConfig, resolveRecoConfigPath } from './utils'

const { type } = getRecoConfig(resolveRecoConfigPath())
const typeConfig = require(path.resolve(
  process.cwd(),
  `node_modules/${type}/lib/config.js`
)).default

export const recoTheme: Theme<ThemeConfig> = ({
  themePlugins = {},
  ...localeOptions
}) => {
  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(process.cwd(), `node_modules/${type}/lib/layouts`),
    plugins: [['@vuepress-reco/page', typeConfig.pages || [1]]],
  }
}

export default recoTheme
