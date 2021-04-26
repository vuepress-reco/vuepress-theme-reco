import { mdStylePlugin } from './plugin-md-style'

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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [mdStylePlugin],
}
