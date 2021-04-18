const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addBase, addUtilities, config }) {
  const newUtilities = {
    '.h-screen-3/5': {
      height: '60vh',
    },
  }

  addUtilities(newUtilities)
  addBase({
    h1: { fontSize: config('theme.fontSize.2xl') },
    h2: { fontSize: config('theme.fontSize.xl') },
    h3: { fontSize: config('theme.fontSize.lg') },
  })
})
