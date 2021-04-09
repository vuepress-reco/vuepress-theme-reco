import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { getRecoConfig, resolveRecoConfigPath } from './utils'

const { style } = getRecoConfig(resolveRecoConfigPath())
const styleConfig = require(path.resolve(
  process.cwd(),
  `node_modules/${style}/lib/index.js`
)).default

export const recoTheme: Theme<ThemeConfig> = ({
  themePlugins = {},
  ...localeOptions
}) => {
  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(process.cwd(), `node_modules/${style}/lib/layouts`),
    plugins: [['@vuepress-reco/page', styleConfig.pages || []]],
  }
}

export default recoTheme
