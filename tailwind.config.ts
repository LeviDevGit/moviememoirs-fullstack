import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#18181B',
        button: '#009D1A',
        card: '#27272a',
        filter: '#1f1f1f',
        submit: '#8f001a',
        'modal-overlay': '#5d5d5d',
      },
      boxShadow: {
        cardShadow:
          'rgba(0, 0, 0, 0.35) 0px 1px 5px, rgba(0, 0, 0, 0.8) 0px 3px 10px',
        imageShadow: '0 0 0 1px rgba(221, 238, 255, 0.35);',
      },
    },
  },
  plugins: [],
} satisfies Config
