import { colors } from './custom-colors.js'

export const tailwindcssConfig = {
  darkMode: 'class',
  content: [
    'node_modules/**/vuepress-theme-reco/lib/**/*.(vue|html)',
    'node_modules/**/@vuepress-reco/**/lib/**/*.(vue|html)',
  ],
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
