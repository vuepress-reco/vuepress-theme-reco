import { tailwindcssConfig } from '@vuepress-reco/tailwindcss-config'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'

export const mergeViteBundlerConfig = (options: ViteBundlerOptions, config: ViteBundlerOptions): ViteBundlerOptions => {
  // Handling postcss alone
  // For inline PostCSS config, it expects the same format as postcss.config.js.
  // But for plugins property, only array format can be used.
  const userViteConfig = config?.viteOptions || {}
  if (typeof userViteConfig?.css?.postcss === 'string') throw new Error('String type postcss is not supported yet')
  if (!Array.isArray(userViteConfig?.css?.postcss?.plugins)) throw new Error('plugins for postcss must be an array')
  const userPostcssPlugins = userViteConfig?.css?.postcss?.plugins || []

  const viteOptions = {
    css: {
      postcss: {
        plugins: [...(options?.viteOptions?.css?.postcss as any)?.plugins, ...userPostcssPlugins],
        ...userViteConfig?.css?.postcss
      },
      ...userViteConfig?.css?.postcss
    },
    ...userViteConfig
  }

  return {
    viteOptions: { ...viteOptions },
    vuePluginOptions: { ...(options?.vuePluginOptions || {}), ...(config?.vuePluginOptions || {}) }
  }
}

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
