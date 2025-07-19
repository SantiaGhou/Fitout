/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        content: {
          primary: '#FFFFFF',
          secondary: '#C7C9CC',
          tertiary: '#D9D9D9',
          brand: '#F74D00',
          inverse: '#030203',
        },
        background: {
          primary: '#020202',
          secondary: '#111012',
          tertiary: '#24222E',
          brand: '#F74D00',
          gray: '#3D3D3D',
        },
        accent: {
          pink: '#C927B6',
          blue: '#0065E4',
          green: '#0FAF8A',
          lime: '#D1DC97',
          red: '#FD294A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};