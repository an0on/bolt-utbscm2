/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2c3e50',
          light: '#34495e',
        },
        secondary: {
          DEFAULT: '#34495e',
          light: '#465c71',
        },
        accent: {
          orange: '#e67e22',
          green: '#27ae60',
          yellow: '#f1c40f',
        },
        background: '#ecf0f1',
        surface: '#ffffff',
      },
    },
  },
  plugins: [],
};
