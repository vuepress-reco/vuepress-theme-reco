const plugin = require('tailwindcss/plugin.js')

export const mdStylePlugin = plugin(
  ({ addComponents, addBase, addUtilities, config }) => {
    const buttons = {
      '.btn': {
        padding: '.5rem 1rem',
        borderRadius: '.25rem',
        fontWeight: '600',
      },
      '.btn-blue': {
        'backgroundColor': '#3490dc',
        'color': '#fff',
        '&:hover': {
          backgroundColor: '#2779bd',
        },
      },
      '.btn-red': {
        'backgroundColor': '#e3342f',
        'color': '#fff',
        '&:hover': {
          backgroundColor: '#cc1f1a',
        },
      },
    }

    addComponents(buttons)

    const newUtilities = {
      '.hhhhh': {
        height: '60vh',
      },
    }

    addUtilities(newUtilities)

    addBase({
      h1: {
        fontSize: config('theme.fontSize.2xl'),
      },
    })
  }
)
