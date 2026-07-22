import { colors } from './custom-colors.js'
import plugin from 'tailwindcss/plugin.js'

// 判断当前环境是否为开发环境
const isDevelopment = process.env.NODE_ENV === 'development'

const recoSemanticUtilities = plugin(({ addUtilities, theme }) => {
  const color = (path: string) => theme(`colors.${path}`) as string

  addUtilities({
    '.text-basic': { color: color('reco.text.lightmode.DEFAULT') },
    '.dark .text-basic': { color: color('reco.text.darkmode.DEFAULT') },
    '.text-lighter': { color: color('reco.text.lightmode.lighter') },
    '.dark .text-lighter': { color: color('reco.text.darkmode.lighter') },
    '.text-heavier': { color: color('reco.text.lightmode.heavier') },
    '.dark .text-heavier': { color: color('reco.text.darkmode.heavier') },
    '.border-basic': {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: color('reco.border.lightmode'),
    },
    '.dark .border-basic': { borderColor: color('reco.border.darkmode') },
    '.border-basic-top': {
      borderWidth: '0',
      borderTopWidth: '1px',
      borderStyle: 'solid',
      borderColor: color('reco.border.lightmode'),
    },
    '.dark .border-basic-top': { borderColor: color('reco.border.darkmode') },
    '.border-basic-bottom': {
      borderWidth: '0',
      borderBottomWidth: '1px',
      borderStyle: 'solid',
      borderColor: color('reco.border.lightmode'),
    },
    '.dark .border-basic-bottom': { borderColor: color('reco.border.darkmode') },
    '.border-basic-left': {
      borderWidth: '0',
      borderLeftWidth: '1px',
      borderStyle: 'solid',
      borderColor: color('reco.border.lightmode'),
    },
    '.dark .border-basic-left': { borderColor: color('reco.border.darkmode') },
    '.border-basic-right': {
      borderWidth: '0',
      borderRightWidth: '1px',
      borderStyle: 'solid',
      borderColor: color('reco.border.lightmode'),
    },
    '.dark .border-basic-right': { borderColor: color('reco.border.darkmode') },
    '.border-primary': {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: color('reco.primary'),
    },
    '.border-block': {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: color('reco.border.lightmode'),
      borderRadius: '0.5rem',
    },
    '.dark .border-block': { borderColor: color('reco.border.darkmode') },
    '.border-block-primary': {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: color('reco.primary'),
      borderRadius: '0.5rem',
    },
    '.bg-basic': {
      color: color('reco.text.lightmode.DEFAULT'),
      backgroundColor: color('reco.bg.lightmode.DEFAULT'),
    },
    '.dark .bg-basic': {
      color: color('reco.text.darkmode.DEFAULT'),
      backgroundColor: color('reco.bg.darkmode.DEFAULT'),
    },
    '.bg-block': {
      color: color('reco.text.lightmode.DEFAULT'),
      backgroundColor: color('reco.bg.lightmode.code'),
    },
    '.dark .bg-block': {
      color: color('reco.text.darkmode.DEFAULT'),
      backgroundColor: color('reco.bg.darkmode.code'),
    },
    '.bg-active': {
      color: color('reco.text.lightmode.DEFAULT'),
      backgroundColor: color('reco.bg.lightmode.active'),
    },
    '.dark .bg-active': {
      color: color('reco.text.darkmode.DEFAULT'),
      backgroundColor: color('reco.bg.darkmode.active'),
    },
  })
})

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
  safelist: [],
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
  plugins: [recoSemanticUtilities],
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
