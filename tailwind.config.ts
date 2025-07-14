import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#000',
        foreground: '#fff',
        accent: '#fff',
        'accent-glow': '#fff',
        'card-bg': 'rgba(0,0,0,0.7)',
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

export default config