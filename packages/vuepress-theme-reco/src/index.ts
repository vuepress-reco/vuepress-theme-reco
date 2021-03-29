import type { Theme, ThemeConfig } from '@vuepress/core'
import { path } from '@vuepress/utils'

export const defaultTheme: Theme<ThemeConfig> = ({
  themePlugins = {},
  ...localeOptions
}) => {
  return {
    name: 'vuepress-theme-reco',
    layouts: path.resolve(__dirname, './layouts'),
    plugins: [
      [
        '@vuepress-reco/blog',
        {
          frontmatters: [
            {
              id: 'tags',
              keys: ['tags'],
              path: '/tag/',
              layout: 'Tags',
              scopeLayout: 'Tag',
            },
            {
              id: 'categories',
              keys: ['categories'],
              path: '/categories/',
              layout: 'Categories',
              scopeLayout: 'Category',
            },
            {
              id: 'timeline',
              keys: ['timeline'],
              path: '/timeline/',
              layout: 'TimeLines',
              scopeLayout: 'TimeLine',
            },
          ],
        },
      ],
    ],
  }
}

export default defaultTheme
