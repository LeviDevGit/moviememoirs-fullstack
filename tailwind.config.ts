import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'solid-pink': '#832F3E',
      },
      colors: {
        'antique-ruby': '#841B2D',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
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
