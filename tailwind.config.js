/** @type {import('tailwindcss').Config} */
import lineClamp from '@tailwindcss/line-clamp';
import typography from '@tailwindcss/typography';

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out',
      },
      fontFamily: {
        oswald: ['var(--font-oswald)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        darkGray: '#484848',
        mediumGray: '#A0A0A0',
        lightGray: '#969696',
        highlight: '#f4f00e',
      },
    },
  },
  plugins: [lineClamp, typography],
};
