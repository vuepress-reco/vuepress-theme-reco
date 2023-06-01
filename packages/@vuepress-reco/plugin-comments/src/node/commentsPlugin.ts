import { path, getDirname } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'
import { readFileSync, readdirSync, writeFileSync } from 'fs'

const __dirname = getDirname(import.meta.url)

export const commentsPlugin = (): Plugin => {
  return {
    name: '@vuepress-reco/vuepress-plugin-comments',
    onGenerated: (app) => {
      const files = readdirSync(app.dir.dest('assets'))
      let styleFileName = ''
      files.forEach((file) => {
        if (/\.css/.test(file)) {
          styleFileName = file
        }
      })
      if (styleFileName) {
        try {
          let content = readFileSync(app.dir.dest('assets/' + styleFileName), {
            encoding: 'utf8',
          })
          let lightdarkIndexStart = content.indexOf(
            '/*!giscus-theme-light-start*/'
          )
          let lightIndexEnd = content.indexOf('/*!giscus-theme-light-end*/')
          let darkdarkIndexStart = content.indexOf(
            '/*!giscus-theme-dark-start*/'
          )
          let darkIndexEnd = content.indexOf('/*!giscus-theme-dark-end*/')
          const giscusThemeLight = content.substring(
            lightdarkIndexStart,
            lightIndexEnd + 27
          )
          const giscusThemeDark = content.substring(
            darkdarkIndexStart,
            darkIndexEnd + 26
          )
          content = content.replace(giscusThemeLight, '')
          content = content.replace(giscusThemeDark, '')
          writeFileSync(app.dir.dest('assets/' + styleFileName), content)
          writeFileSync(
            app.dir.dest('assets/giscus-theme.css'),
            giscusThemeLight
          )
          writeFileSync(
            app.dir.dest('assets/giscus-theme-dark.css'),
            giscusThemeDark
          )
        } catch (error) {
          console.error(
            '[THEME RECO ERROR] ',
            'an error occurred while processing the style of giscus',
            error
          )
        }
      }
    },
    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  }
}
