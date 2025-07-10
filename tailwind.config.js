/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        foreground: '#f4f4f9',
        accent: '#4fd1c5',
        'accent-glow': '#1d8cf8',
        'card-bg': 'rgba(40,40,50,0.7)',
      },
      boxShadow: {
        'glow': '0 0 8px 2px #4fd1c5, 0 4px 24px rgba(0,0,0,0.5)',
        'glow-lg': '0 8px 32px #1d8cf8, 0 2px 8px rgba(0,0,0,0.25)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 8px 2px #4fd1c5' },
          '50%': { boxShadow: '0 0 24px 8px #1d8cf8' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease',
        slideInUp: 'slideInUp 0.6s cubic-bezier(0.4,0,0.2,1)',
        glow: 'glow 2s infinite',
      },
    },
  },
  plugins: [],
} 