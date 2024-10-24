import { App } from "vuepress/core";
import { ensureEndingSlash } from '@vuepress/helper'
import { getDirname, path, fs } from 'vuepress/utils'

import { getComponentsFromDir } from './getComponentsFromDir.js';

const __dirname = getDirname(import.meta.url)

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

export async function prepareClientConfigFile(app: App, themeConfig): Promise<string> {
  const layoutsDir = path.join(
    process.cwd(),
    themeConfig?.docsDir || '/',
    './.vuepress/layouts'
  )

  const layoutsFromDirMap = await getComponentsFromDir({
    componentsDir: layoutsDir,
    componentsPatterns: ['**/*.vue'],
    getComponentName: (filename) => path.trimExt(filename.replace(/\/|\\/g, '-')),
  })

  let layoutsFromDir = ''

  for (const key in layoutsFromDirMap) {
    if (layoutsFromDirMap.hasOwnProperty(key)) {
      layoutsFromDir += `
      ${key}: defineAsyncComponent(() => import("${layoutsFromDirMap[key]}")),
      `
    }
  }

  layoutsFromDir = `{${layoutsFromDir}}`

  let content = ''

  content += `
  import { defineAsyncComponent } from 'vue'
import { defineClientConfig } from 'vuepress/client'

import { applyClientSetup } from '${CLIENT_FOLDER}clientSetup.js'
import { applyClientEnhance } from '${CLIENT_FOLDER}clientEnhance.js'

import * as layouts from '${CLIENT_FOLDER}layouts/index.js'
`
  content += `
  const layoutsFromDir = ${layoutsFromDir}
`

  content += `export default defineClientConfig({
  enhance(...args) {
    applyClientEnhance(...args)
  },
  setup() {
    applyClientSetup()
  },
  // @ts-ignore
  layouts: { ...layouts, ...layoutsFromDir },
})
`

  return app.writeTemp(`theme-reco/config.js`, content)
}
