import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',

        'button-primary-text': 'var(--color-button-primary-text)',
      },
      backgroundColor: {
        primary: 'var(--color-bg)',
        'button-primary': 'var(--color-button-primary-bg)',
        'button-primary-hover': 'var(--color-button-primary-bg-hover)',
        'button-secondary': 'var(--color-button-secondary-bg)',
        'button-secondary-hover': 'var(--color-button-secondary-bg-hover)',
      },
      textColor: {
        primary: 'var(--color-text)',
        'button-primary': 'var(--color-button-text)',
      },
    },
  },
  plugins: [],
};
export default config;
