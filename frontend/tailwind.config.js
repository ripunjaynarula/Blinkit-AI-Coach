/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blinkit: {
          green: '#0c831f',
          'green-dark': '#075914',
          'green-light': '#e8f5e9',
          yellow: '#f7c20a',
          'yellow-light': '#fff9db',
          bg: '#f4f6fb',
          border: '#e5e7eb',
          text: '#1f2937',
          muted: '#6b7280'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
