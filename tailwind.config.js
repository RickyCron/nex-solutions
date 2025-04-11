/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0D0B0B', // Deep Black
          hover: '#1A1818',
        },
        secondary: {
          DEFAULT: '#6EC6D9', // Aqua Blue
          dark: '#5AB3C6',
        },
        accent: {
          DEFAULT: '#CC4A4A', // Red
          hover: '#B43E3E',
        },
        light: '#EEEEEE', // Off-White
        dark: '#1A1A1A', // Dark gray for text
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #6EC6D9 0%, #0D0B0B 100%)',
      },
    },
  },
  plugins: [],
};