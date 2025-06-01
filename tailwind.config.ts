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
        background: '#1f1f1f',
        button: '#009D1A',
        card: '#27272a',
        filter: '#5B655E',
        modal: '#634643',
        submit: '#8f001a',
        // Another option for background
        'eerie-black': '#18181B',
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
