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
        // Deep Obsidian Slate (Dark Mode) to Crisp Paper Slate (Light Mode)
        slateDark: {
          950: '#070A11',
          900: '#0B0F19', // Primary Dark Background
          850: '#0F172A', // Elevated Dark Surface
          800: '#1E293B', // Card Surface
          700: '#334155', // Subtle Border
          600: '#475569',
          500: '#64748B', // Secondary Text
          400: '#94A3B8', // Muted Text
          300: '#CBD5E1',
          200: '#E2E8F0', // Light Mode Border
          100: '#F1F5F9', // Light Mode Elevated
          50: '#F8FAFC',  // Primary Light Background
        },

        // Cyber Teal Accent (Precise, Modern Developer Tone)
        tealAccent: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6', // Primary Accent
          600: '#0D9488', // Light mode accessible teal
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },

        // Subdued Indigo (Secondary Tech Accent)
        indigoAccent: {
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },

        // Clean Glass Tokens (Dynamic via CSS variables)
        glass: {
          surface: 'var(--glass-bg)',
          border: 'var(--glass-border)',
          highlight: 'var(--glass-highlight)',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glass-dark': '0 20px 45px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'glass-light': '0 10px 30px -5px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'teal-glow': '0 0 25px -4px rgba(20, 184, 166, 0.3)',
      },
      animation: {
        'subtle-drift': 'subtleDrift 20s ease-in-out infinite alternate',
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
      },
      keyframes: {
        subtleDrift: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(12px, -8px) scale(1.02)' },
          '100%': { transform: 'translate(-8px, 10px) scale(0.99)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.75' },
        },
      },
    },
  },
  plugins: [],
}
