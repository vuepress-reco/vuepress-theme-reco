import { tailwindcssConfig } from '@vuepress-reco/tailwindcss-config'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'

export const mergeViteBundlerConfig = (options: ViteBundlerOptions, config: ViteBundlerOptions): ViteBundlerOptions => ({
  viteOptions: { ...(options?.viteOptions || {}), ...(config?.viteOptions || {}) },
  vuePluginOptions: { ...(options?.vuePluginOptions || {}), ...(config?.vuePluginOptions || {}) }
})

export const defaultViteBundlerConfig = (): ViteBundlerOptions => ({
  viteOptions: {
    css: {
      postcss: {
        plugins: [
          require('postcss-import'),
          require('tailwindcss/nesting'),
          require('tailwindcss')(tailwindcssConfig),
          require('autoprefixer')({}),
          require('postcss-each')
        ]
      }
    },
  }
})

export const resolveUserConfig = (config: Record<string, unknown>) => {
  return config?.viteBundler as ViteBundlerOptions || {}
}
