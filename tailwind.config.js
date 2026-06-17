/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        accent: {
          50: '#fef3f2',
          100: '#fde6e4',
          200: '#fbd3cf',
          300: '#f7b4ad',
          400: '#f08a80',
          500: '#e66658',
          600: '#d44838',
          700: '#b13628',
          800: '#912d20',
          900: '#782821',
        },
        gold: {
          50: '#fbf9eb',
          100: '#f5f0c6',
          200: '#efe091',
          300: '#e6cb5a',
          400: '#ddb83a',
          500: '#d4a72e',
          600: '#c59126',
          700: '#a57420',
          800: '#855c1f',
          900: '#6d4c1d',
        },
      },
      fontFamily: {
        hebrew: ['Heebo', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
        rtl: {
          css: {
            direction: 'rtl',
            textAlign: 'right',
          },
        },
      },
    },
  },
  plugins: [],
};
