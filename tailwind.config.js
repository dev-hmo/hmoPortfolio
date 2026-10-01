/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crystal: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        void: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#1a0533',
        },
        neon: {
          cyan: '#00f0ff',
          purple: '#8a2be2',
          pink: '#ff0055',
          blue: '#2563eb',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      animation: {
        'liquid-slow': 'liquidShift 20s ease-in-out infinite',
        'liquid-medium': 'liquidShift 15s ease-in-out infinite reverse',
        'liquid-fast': 'liquidShift 10s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'iridescent': 'iridescent 6s ease-in-out infinite',
        'mesh-rotate': 'meshRotate 30s linear infinite',
      },
      keyframes: {
        liquidShift: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', transform: 'rotate(0deg) scale(1)' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%', transform: 'rotate(90deg) scale(1.05)' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%', transform: 'rotate(180deg) scale(1)' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 50% 60%', transform: 'rotate(270deg) scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        iridescent: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        meshRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundSize: {
        '300': '300% 300%',
        '400': '400% 400%',
      },
    },
  },
  plugins: [],
}
