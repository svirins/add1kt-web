const { fontFamily, colors } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx', './layouts/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        gray: {
          0: '#fff',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111'
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans', ...fontFamily.sans]
      },
    },
    variants: {
      typography: ['dark']
    },
    plugins: [require('@tailwindcss/typography')]
  }
};
