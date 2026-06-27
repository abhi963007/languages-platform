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
          DEFAULT: '#2563EB', // Electric Blue
          container: '#1E3A8A', // Deep Blue
          fixed: '#DBEAFE',
          'fixed-dim': '#93C5FD',
        },
        secondary: {
          DEFAULT: '#3B82F6', // Royal Blue Accent
          container: '#1D4ED8', // Royal Blue
          fixed: '#EFF6FF',
          'fixed-dim': '#60A5FA',
        },
        background: {
          DEFAULT: '#0B132B', // Midnight Blue
          light: '#F8FAFC',
          dark: '#0B132B',
        },
        surface: {
          DEFAULT: '#1C2541', // Dark Navy Surface
          glass: 'rgba(28, 37, 65, 0.7)',
          bright: '#F8FAFC',
          dim: '#1E293B',
          container: '#EFF6FF',
          'container-high': '#DBEAFE',
          'container-highest': '#BFDBFE',
          'container-low': '#F0F5FF',
          'container-lowest': '#FFFFFF',
          variant: '#EFF6FF',
        },
        accent: {
          DEFAULT: '#3B82F6',
          gold: '#F59E0B',
        },
        energy: {
          pink: '#EF4444', // Red/Crimson
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
