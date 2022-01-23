import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'
import { resolveContainerOptions } from './resolveContainer'

export const recoTheme: Theme<ThemeConfig> = (themeConfig: ThemeConfig) => {
  const { style } = themeConfig
  const stylePath = path.resolve(process.cwd(), `node_modules/${style}`)
  const getStyleConfig = require(path.resolve(
    `${stylePath}/lib/node/index.js`
  )).default

  const styleConfig = getStyleConfig(themeConfig)
  styleConfig.plugins = [
    '@vuepress/plugin-git',
    '@vuepress/plugin-search',
    '@vuepress/plugin-palette',
    '@vuepress/plugin-prismjs',
    ['@vuepress/active-header-links', {
        headerLinkSelector: 'a.page-header-item',
    }],
    ['@vuepress/plugin-container', resolveContainerOptions('tip')],
    ['@vuepress/plugin-container', resolveContainerOptions('info')],
    ['@vuepress/plugin-container', resolveContainerOptions('warning')],
    ['@vuepress/plugin-container', resolveContainerOptions('danger')],
    ['@vuepress/plugin-container', resolveContainerOptions('details')],
    ['@vuepress/plugin-container', resolveContainerOptions('code-group')],
    ['@vuepress/plugin-container', resolveContainerOptions('code-group-item')],
    ['@vuepress/plugin-external-link-icon'],
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

