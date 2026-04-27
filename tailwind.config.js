/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D0D0F',
        'bg-secondary': '#16161A',
        'bg-tertiary': '#1E1E24',
        'text-primary': '#FFFFFE',
        'text-secondary': '#94A1B2',
        'text-muted': '#6B7280',
        'accent-cyan': '#22D3EE',
        'accent-amber': '#FBBF24',
        'accent-emerald': '#34D399',
        'accent-rose': '#FB7185',
        'accent-violet': '#A78BFA',
        'border': '#2A2A32',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'hand': ['Caveat', 'cursive'],
      },
      borderRadius: {
        'card': '16px',
        'input': '12px',
        'btn': '8px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}