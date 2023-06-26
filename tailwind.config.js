module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-green': '#344E41',
        'custom-olive': '#4A5742',
        'custom-background': '#CAD2C5',
        'custom-grey': '#9D9D9D',
        'custom-blue': '#1B2836',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [ 
    require('tailwind-scrollbar'),
  ]
}
