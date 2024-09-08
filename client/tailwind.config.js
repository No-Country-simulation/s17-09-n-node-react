/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  scale: {
    '90': '0.9',
    '80': '0.8',
  },
  theme: {
    extend: {
      colors: {
        bg: '#2D3250',
        policeBlue: '#424769',
        rhythm: '#7077A1',
        mellowApricot: '#F6B17A',
        linen: '#FFECEC',
      },
    },
  },
  plugins: [],
}
