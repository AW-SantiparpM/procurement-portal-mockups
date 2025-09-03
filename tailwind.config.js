/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d9f1ff',
          200: '#bce7ff',
          300: '#8dd9ff',
          400: '#55c4ff',
          500: '#2aa7f5',
          600: '#1584d6',
          700: '#1169ad',
          800: '#135b8e',
          900: '#144c73',
          950: '#0d324d'
        }
      }
    }
  },
  plugins: []
};
