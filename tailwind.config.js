/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { fontFamily, colors } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
          900: '#111111',
        },
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', ...fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.teal.600'),
              '&:hover': {
                color: theme('colors.teal.800'),
              },
            },
          },
        },
        dark: {
          css: {
            a: {
              color: theme('colors.teal.600'),
              '&:hover': {
                color: theme('colors.blue.400'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') },
              },
            },
            strong: { color: theme('colors.gray.100') },
          },
        },
      }),
    },
    variants: {
      typography: ['dark'],
    },
    plugins: [require('@tailwindcss/typography')],
  },
};
