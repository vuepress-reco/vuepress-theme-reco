import tailwindcss from 'tailwindcss'
import { path } from 'vuepress/utils'
import postcssEach from 'postcss-each'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'
import { tailwindcssConfig } from '@vuepress-reco/tailwindcss-config'

// The bundlers for vuepress
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'

import type { Config } from 'tailwindcss'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'

export function injectiBuilderOptionsOfRecoTheme(app, themeConfig) {
  _customizeTailwindcssOptions(themeConfig)

  if (app.options.bundler.name === '@vuepress/bundler-vite') {
    const viteBundlerOptions = _getViteBundlerOptions(themeConfig)
    app.options.bundler = viteBundler(viteBundlerOptions)
  } else {
    const viteBundlerOptions = _getWebpackBundlerOptions(themeConfig)
    app.options.bundler = webpackBundler(viteBundlerOptions)
  }
}

const postcssPlugins = {
  plugins: [
    postcssImport,
    tailwindcssNesting,
    tailwindcss((tailwindcssConfig as unknown) as Config),
    autoprefixer({}),
    postcssEach,
  ],
}

let viteBundlerOptions: ViteBundlerOptions | null = null
const _getViteBundlerOptions = (themeConfig: Record<string, unknown>) => {
  if (viteBundlerOptions) return viteBundlerOptions

  const userConfig =
    (themeConfig?.viteBundlerOptions as ViteBundlerOptions) || {}
  const defaultConfig = {
    viteOptions: { css: { postcss: { ...postcssPlugins } } },
  }
  viteBundlerOptions = _mergeConfig<ViteBundlerOptions>(
    userConfig,
    defaultConfig
  )

  return viteBundlerOptions
}

let webpackBundlerOptions: WebpackBundlerOptions | null = null
const _getWebpackBundlerOptions = (themeConfig: Record<string, unknown>) => {
  if (webpackBundlerOptions) return webpackBundlerOptions

  const userConfig =
    (themeConfig?.webpackBundlerOptions as WebpackBundlerOptions) || {}
  const defaultConfig = {
    chainWebpack: (config) => {
      config.resolve.extensions.merge(['.js', '.vue']).end()
    },
    postcss: {
      postcssOptions: { ...postcssPlugins },
    },
  }
  webpackBundlerOptions = _mergeConfig<WebpackBundlerOptions>(
    userConfig,
    defaultConfig
  )

  return webpackBundlerOptions
}

function _customizeTailwindcssOptions(themeConfig) {
  if (themeConfig?.primaryColor) {
    tailwindcssConfig.theme.extend.colors.reco.primary = themeConfig.primaryColor as string
  }

  tailwindcssConfig.content.push(
    path.join(
      themeConfig?.docsDir || '/',
      './.vuepress/components/*.(vue|html|js)'
    )
  )
}

function _mergeConfig<T>(userConfig: T, defaultConfig: T): T {
  const mergedConfig = { ...defaultConfig }

  for (const key in userConfig) {
    if (
      typeof userConfig[key] === 'object' &&
      typeof mergedConfig[key] === 'object'
    ) {
      mergedConfig[key] = _mergeConfig(userConfig[key], mergedConfig[key])
    } else {
      mergedConfig[key] = userConfig[key]
    }
  }

  return mergedConfig
}
