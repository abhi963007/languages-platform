/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#06B6D4',
          container: '#002855',
          fixed: '#d6e3ff',
          'fixed-dim': '#aac7fd',
        },
        secondary: {
          DEFAULT: '#006875',
          container: '#00e3fd',
          fixed: '#9cf0ff',
          'fixed-dim': '#00daf3',
        },
        background: {
          DEFAULT: '#0A1128',
          light: '#f5f8f8',
          dark: '#0f2023',
        },
        surface: {
          DEFAULT: '#151E32',
          glass: 'rgba(255, 255, 255, 0.7)',
          bright: '#f9f9ff',
          dim: '#cfdaf2',
          container: '#e7eeff',
          'container-high': '#dee8ff',
          'container-highest': '#d8e3fb',
          'container-low': '#f0f3ff',
          'container-lowest': '#ffffff',
          variant: '#d8e3fb',
        },
        accent: {
          DEFAULT: '#4F46E5',
          gold: '#FFD700',
        },
        energy: {
          pink: '#FF2E63',
        },
        text: {
          main: '#F8FAFC',
          muted: '#94A3B8',
        },
        border: {
          dark: '#1E293B',
        }
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '50%': { transform: 'translateX(8px)' },
          '75%': { transform: 'translateX(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        dash: {
          'to': { 'stroke-dashoffset': '0' }
        }
      },
      animation: {
        shake: 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
        fadeIn: 'fadeIn 0.5s ease-out both',
        dash: 'dash 2s linear infinite'
      }
    },
  },
  plugins: [],
}
