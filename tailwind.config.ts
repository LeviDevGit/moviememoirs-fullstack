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
        background: '#0e0f12',
        primary: '#7b98f0',
        secondary: '#5b4b60',
        accent: '#831b2c',
        card: '#16181b',

        // Others
        filter: '#1f1f1f',
        'modal-overlay': 'rgba(0, 0, 0, 0.5)',
        text: {
          50: '#e2e4e9',
        },
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
