import { tailwindcssConfig } from '@vuepress-reco/tailwindcss-config'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { WebpackBundlerOptions } from '@vuepress/bundler-webpack'
import postcssImport from 'postcss-import'
import tailwindcssNesting from 'tailwindcss/nesting/index.js'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import postcssEach from 'postcss-each'
import type { Config } from 'tailwindcss'

const postcssPlugins = {
  plugins: [
    postcssImport,
    tailwindcssNesting,
    tailwindcss((tailwindcssConfig as unknown) as Config),
    autoprefixer({}),
    postcssEach,
  ],
}

export const getViteBundlerOptions = (themeConfig: Record<string, unknown>) => {
  const userConfig =
    (themeConfig?.viteBundlerOptions as ViteBundlerOptions) || {}
  const defaultConfig = {
    viteOptions: { css: { postcss: { ...postcssPlugins } } },
  }

  return _mergeConfig<ViteBundlerOptions>(userConfig, defaultConfig)
}

export const getWebpackBundlerOptions = (
  themeConfig: Record<string, unknown>
) => {
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

  return _mergeConfig<WebpackBundlerOptions>(userConfig, defaultConfig)
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
