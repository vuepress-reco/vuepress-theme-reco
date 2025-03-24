import { colors } from './custom-colors.js'

// 判断当前环境是否为开发环境
const isDevelopment = process.env.NODE_ENV === 'development'

// 导出根据环境变量生成的配置
export const tailwindcssConfig = {
  darkMode: 'class',
  // 更精确的文件匹配模式以减少处理文件数量
  content: [
    // 只包含具体组件文件夹和布局相关文件
    'node_modules/**/vuepress-theme-reco/lib/client/components/**/*.(vue|html)',
    'node_modules/**/vuepress-theme-reco/lib/client/layouts/**/*.(vue|html)',
    // 特定插件的关键组件
    'node_modules/**/@vuepress-reco/**/lib/client/components/**/*.(vue|html)',
  ],
  // 开发环境优化
  safelist: [],
  // 启用JIT模式
  mode: 'jit',
  // 启用裁剪模式，只生成实际使用的类
  purge: {
    enabled: true, // 在开发和生产环境中都启用
    content: isDevelopment ? [
      // 开发环境：更严格的匹配，只关注关键组件
      'node_modules/**/vuepress-theme-reco/lib/client/components/**/*.(vue|html)',
      'node_modules/**/vuepress-theme-reco/lib/client/layouts/**/*.(vue|html)',
      'node_modules/**/@vuepress-reco/**/lib/client/components/**/*.(vue|html)',
    ] : [
      // 生产环境：包含所有可能的文件
      'node_modules/**/vuepress-theme-reco/lib/**/*.(vue|html)',
      'node_modules/**/@vuepress-reco/**/lib/**/*.(vue|html)',
    ],
  },
  // 禁用状态变体，减少生成的CSS数量
  corePlugins: isDevelopment ? {
    // 开发环境中禁用部分变体样式以提高性能
    preflight: false, // 禁用默认样式重置
    groupHover: false, // 禁用组悬停效果
    focus: false, // 禁用聚焦效果
    focusVisible: false, // 禁用可见聚焦效果
    active: false, // 禁用活动状态效果
    disabled: false, // 禁用禁用状态效果
    visited: false, // 禁用已访问状态效果
    firstChild: false, // 禁用第一子元素选择器
    lastChild: false, // 禁用最后子元素选择器
    odd: false, // 禁用奇数行选择器
    even: false, // 禁用偶数行选择器
  } : {
    // 生产环境保持全部功能
  },
  // 禁用不需要的功能，减少生成的CSS
  // 根据实际需求可以添加或删除
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      backgroundOpacity: {
        98: '.98',
      },
      borderRadius: {
        '1/2': '50%',
      },
      borderWidth: {
        6: '6px',
      },
      // boxShadow 不支持嵌套
      boxShadow: {
        'light': '0 1px 8px 0 rgba(0, 0, 0, 0.1)',
        'light-heavier': '0 2px 16px 0 rgba(0, 0, 0, 0.2)',
        'dark': '0 1px 8px 0 rgba(0, 0, 0, .6)',
        'dark-heavier': '0 2px 16px 0 rgba(0, 0, 0, .7)',
      },
      colors,
      height: (): Record<string, any> => ({ 'screen-3/5': '60vh' }),
      zIndex: {
        'negative-10': -10,
      },
      rotate: {
        '225': '225deg',
        '315': '315deg',
      },
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '1.5xl': '1360px',
       // => @media (min-width: 1400px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
}
