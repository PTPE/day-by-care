import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/icons/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        accent: 'rgb(var(--color-accent))',
        line: 'rgb(var(--color-line))',
      },
      backgroundColor: {
        primary: 'rgb(var(--color-bg))',
        secondary: 'rgb(var(--color-bg-secondary))',
        'button-primary': 'rgb(var(--color-button-primary-bg))',
        'button-primary-hover': 'rgb(var(--color-button-primary-bg-hover))',
        'button-secondary': 'rgb(var(--color-button-secondary-bg))',
        'button-secondary-hover': 'rgb(var(--color-button-secondary-bg-hover))',
        'button-accent': 'rgb(var(--color-button-accent-bg))',
        'button-accent-hover': 'rgb(var(--color-button-accent-bg-hover))',
      },
      textColor: {
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        accent: 'rgb(var(--color-accent))',
        'button-primary': 'rgb(var(--color-button-primary-text))',
        'button-secondary': 'rgb(var(--color-button-secondary-text))',
        'button-accent': 'rgb(var(--color-button-accent-text))',
      },
    },
  },
  plugins: [],
};
export default config;
