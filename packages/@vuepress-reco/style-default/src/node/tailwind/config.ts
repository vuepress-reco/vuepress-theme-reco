import { mdStylePlugin } from './plugin-md-style'
const colors = require('tailwindcss/colors')

export const tailwindConfig = {
  purge: ['./src/**/*.vue'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      'md': '1024px',
      'lg': '1280px',
      'xl': '1536px',
      '2xl': '1880px',
    },
    extend: {
      height: (): Record<string, any> => ({ 'screen-3/5': '60vh' }),
      colors: {
        primary: colors.green,
      },
      borderRadius: {
        '1/2': '50%',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['dark'],
      borderWidth: ['dark'],
    },
  },
  plugins: [mdStylePlugin],
}
