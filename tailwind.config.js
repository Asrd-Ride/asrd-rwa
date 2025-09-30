/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0A0F2C',
          cyan: '#00D1FF',
          violet: '#7B61FF',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px #00D1FF, 0 0 10px #00D1FF, 0 0 15px #00D1FF' },
          '100%': { boxShadow: '0 0 10px #00D1FF, 0 0 20px #00D1FF, 0 0 30px #00D1FF' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%': { textShadow: '0 0 5px #00D1FF, 0 0 10px #00D1FF' },
          '100%': { textShadow: '0 0 10px #00D1FF, 0 0 20px #00D1FF, 0 0 30px #00D1FF' },
        }
      }
    },
  },
  plugins: [],
}
