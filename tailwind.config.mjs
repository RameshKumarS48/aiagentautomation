/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F1115',
          card: '#151821',
          border: '#1E2330',
          hover: '#1A1F2E',
        },
        accent: {
          blue: '#5B8CFF',
          purple: '#7B5CFF',
          cyan: '#00D4FF',
        },
        text: {
          primary: '#F5F7FA',
          secondary: '#9AA3B2',
          muted: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #5B8CFF 0%, #7B5CFF 100%)',
        'gradient-card': 'linear-gradient(135deg, #151821 0%, #1A1F2E 100%)',
        'gradient-hero': 'radial-gradient(ellipse at top, #1A1F2E 0%, #0F1115 70%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(91, 140, 255, 0.15)',
        'glow-lg': '0 0 40px rgba(91, 140, 255, 0.2)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
      },
    },
  },
  plugins: [],
}
