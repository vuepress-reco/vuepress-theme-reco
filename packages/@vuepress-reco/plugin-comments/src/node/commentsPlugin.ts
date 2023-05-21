import { path, getDirname } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'
import { rename } from 'fs'

const __dirname = getDirname(import.meta.url)

export const commentsPlugin = (): Plugin => {
  return {
    name: '@vuepress-reco/vuepress-plugin-comments',
    extendsBundlerOptions: (bundlerOptions, app) => {
      if (app.options.bundler.name === '@vuepress/bundler-vite') {
        bundlerOptions.viteOptions ??= {}
        bundlerOptions.viteOptions.build ??= {}
        bundlerOptions.viteOptions.build.cssCodeSplit = true
        bundlerOptions.viteOptions.build.rollupOptions ??= {}
        bundlerOptions.viteOptions.build.rollupOptions.output ??= {}
        if (app.env.isBuild) {
          bundlerOptions.viteOptions.build.rollupOptions.output.assetFileNames = (assetInfo: any) => {
            if (/giscus-theme(-dark)?\.css/.test(assetInfo.name)) {
              return 'assets/[name]'
            } else {
              return 'assets/[name]-[hash][extname]'
            }
          }

        }
        bundlerOptions.viteOptions.build.rollupOptions.output.manualChunks = (id: any): string | undefined => {
          if (/giscus-theme(-dark)?\.css/.test(id)) {
              return id.match(/giscus-theme(-dark)?\.css/)[0]
            }
        }
      }
    },
    onGenerated: (app) => {
      rename(app.dir.dest('assets/giscus-theme'), app.dir.dest('assets/giscus-theme.css'), (err) => { err&&console.error(err) })
      rename(app.dir.dest('assets/giscus-theme-dark'), app.dir.dest('assets/giscus-theme-dark.css'), (err) => { err&&console.error(err) })
    },
    clientConfigFile: path.resolve(
      __dirname,
      '../client/config.js'
    ),
  }
}
