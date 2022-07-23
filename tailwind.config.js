const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#F6F6FB',
        'main-color': '#1625AB',
        'main-color-hover': '#1A2CC9',
      },
    },
  },
};
