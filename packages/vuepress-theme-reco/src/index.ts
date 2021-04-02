import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { getRecoConfig, resolveRecoConfigPath } from './utils'

const { type } = getRecoConfig(resolveRecoConfigPath())

export const recoTheme: Theme<ThemeConfig> = ({
  themePlugins = {},
  ...localeOptions
}) => {
  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(process.cwd(), `node_modules/${type}/lib/layouts`),
    plugins: [],
  }
}

export default recoTheme
