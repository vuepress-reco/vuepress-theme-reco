import { defineStyle } from '@vuepress-reco/core'
import { path } from '@vuepress/utils'

export default defineStyle({
  pages: [
    {
      type: 'frontmatter',
      frontmatterKey: 'reco-categories',
      path: '/categories/',
      layout: 'Categories',
      pagination: 10,
    },
    {
      type: 'frontmatter',
      frontmatterKey: 'reco-tags',
      path: '/tags/',
      layout: 'Tags',
      pagination: 10,
    },
    {
      path: '/timeline/',
      layout: 'TimeLine',
    },
  ],
  clientAppEnhanceFiles: path.resolve(
    __dirname,
    './client/clientAppEnhance.js'
  ),
  onInitialized(app): void {
    app.options.bundlerConfig = {
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: {
              purge: ['./src/**/*.vue'],
              darkMode: false, // or 'media' or 'class'
              theme: {
                extend: {},
              },
              variants: {
                extend: {},
              },
              plugins: [require('@tailwindcss/typography')],
            },
            autoprefixer: {},
          },
        },
      },
      ...app.options.bundlerConfig,
    }
  },
})
