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
        // background: '#0e0f12',
        background: '#111827',
        primary: '#7b98f0',
        secondary: {
          600: '#6d5a72',
          700: '#514356',
        },
        accent: '#831b2c',
        // card: '#16181b',
        card: '#1F2937',

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
      keyframes: {
        blowUpContent: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        blowUpModal: {
          '0%': { transform: 'scale(2)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        blowUpModal:
          'blowUpModal 0.5s cubic-bezier(0.165,0.84,0.44,1) forwards',
        blowUpModalOut:
          'blowUpModalOut 0.5s cubic-bezier(0.165,0.84,0.44,1) forwards',
        blowUpContent:
          'blowUpContent 0.5s cubic-bezier(0.165,0.84,0.44,1) forwards',
        blowUpContentOut:
          'blowUpContentOut 0.5s cubic-bezier(0.165,0.84,0.44,1) forwards',
      },
    },
  },
  plugins: [forms],
} satisfies Config
