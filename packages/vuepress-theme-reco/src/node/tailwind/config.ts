import { mdStylePlugin } from './plugin-md-style'
import { colors as customColors } from './custom-colors'
// const colors = require('tailwindcss/colors')

export const tailwindConfig = {
  purge: ['./src/**/*.vue'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundOpacity: {
        98: '.98'
      },
      borderRadius: {
        '1/2': '50%',
      },
      borderWidth: {
        6: '6px',
      },
      // boxShadow 不支持嵌套
      boxShadow: {
        light: '0 1px 8px 0 rgba(0, 0, 0, 0.1)',
        'light-heavier': '0 2px 16px 0 rgba(0, 0, 0, 0.2)',
        dark:'0 1px 8px 0 rgba(0, 0, 0, .6)',
        'dark-heavier': '0 2px 16px 0 rgba(0, 0, 0, .7)'
      },
      colors: customColors,
      height: (): Record<string, any> => ({ 'screen-3/5': '60vh' }),
      zIndex: {
        'negative-10': -10
      }
    },
  },
  variants: {
    extend: {
      borderColor: ['dark'],
      borderWidth: ['dark'],
      boxShadow: ['dark'],
    },
  },
  plugins: [mdStylePlugin],
}
