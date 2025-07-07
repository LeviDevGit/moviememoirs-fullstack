import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0e0f12',
        primary: '#7b98f0',
        secondary: {
          600: '#6d5a72',
          700: '#514356',
        },
        accent: '#831b2c',
        card: '#16181b',

        // Others
        filter: '#26272A',
        text: {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          950: '#0d0d0d',
        },

        'modal-overlay': 'rgba(0, 0, 0, 0.5)',
      },
      boxShadow: {
        cardShadow:
          'rgba(0, 0, 0, 0.35) 0px 1px 5px, rgba(0, 0, 0, 0.8) 0px 3px 10px',
        imageShadow: '0 0 0 1px rgba(221, 238, 255, 0.35);',
      },
    },
  },
  plugins: [forms],
} satisfies Config
