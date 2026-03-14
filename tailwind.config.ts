import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#22d3ee',
          violet: '#8b5cf6'
        }
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at top, rgba(34, 211, 238, 0.15), rgba(15, 23, 42, 1) 45%), radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.15), rgba(15, 23, 42, 0.9) 55%)'
      }
    }
  },
  plugins: []
};

export default config;
