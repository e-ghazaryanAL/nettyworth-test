/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        primary: '#F5F6FB',
        'light-gray': '#F1F3FB',
        'primary-blue': '#006FFF',
        'dark-blue': '#202B46',
        'off-blue': '#397BBC',
        'grey-blue': '#A9B0C4',
        'mid-blue-grey': '#CCD6EE',
        'light-blue-grey': '#F5F6FB',
        'primary-grey': '#F8F9FB',
        'btn-disabled': '#DAE1F3',
        'light-green': '#6ACC32',
        'google-btn': '#F6F6F6',
        'dark-mode': '#172444',
        'dark-mode-100': "#303B58",
        'dark-mode-btn': '#0D1A3A',
        'dark-mode-light-blue': '#212B43',
        'dark-mode-light': '#323E5A',
        'grey-input': '#DFE3EE'
      },
      textColor: {
        'light-green': '#6ACC32',
        'light-gray': '#798097',
        'liked-heart': '#ff066a',
        primary: '#006FFF',
        'dark-blue': '#202B46',
        'btn-disabled': '#A9B0C4',
        'top-sales': '#151A27',
        'light-blue-grey-text': '#F5F6FB',
        'primary-grey': '#F8F9FB',
        'light-blue' : '#4EADFF',
        'change-color': '#82BB48',
        input: '#465272',
        'light-red': '#FF0707',
        'dark-blue-100' : '#323E5A'
      },
      borderColor: {
        primary: '#006FFF',
        'off-blue': '#397BBC',
        'btn-disabled': '#A9B0C4',
        'dark-blue': '#202B46',
        'dark-border': '#23304d',
        'dark-mode-light-blue': '#323E5A',
        input: '#CCD6EE',
        'light-gray': '#DAE1F3',
        'lighter-gray': '#F1F3FB',
        'lighter-gray-100': '#F5F6FB',
        'lighter-gray-200': '#EBEBEB',
        'lighter-gray-300': '#CCD6EE',
        'lighter-gray-400' : '#DEE5FC',
        'lighter-gray-500': '#DFE3EE'
      },
      boxShadow: {
        'rgb-gray': '0px 0px 9px rgba(0, 0, 0, 0.07)',
      },
      opacity : {
        '85' : '.85',
      }
    },
  },
  plugins: [],
};
