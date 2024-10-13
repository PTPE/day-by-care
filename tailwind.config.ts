import type { Config } from 'tailwindcss';
import { addDynamicIconSelectors } from '@iconify/tailwind';

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

        primaryBg: 'rgb(var(--color-bg))',
        secondaryBg: 'rgb(var(--color-bg-secondary))',
        thirdBg: 'rgb(var(--color-bg-third))',

        button: {
          primary: {
            DEFAULT: 'rgb(var(--color-button-primary-bg))',
            hover: 'rgb(var(--color-button-primary-bg-hover))',
            text: 'rgb(var(--color-button-primary-text))',
          },
          secondary: {
            DEFAULT: 'rgb(var(--color-button-secondary-bg))',
            hover: 'rgb(var(--color-button-secondary-bg-hover))',
            text: 'rgb(var(--color-button-secondary-text))',
          },
          accent: {
            DEFAULT: 'rgb(var(--color-button-accent-bg))',
            hover: 'rgb(var(--color-button-accent-bg-hover))',
            text: 'rgb(var(--color-button-accent-text))',
          },
          warning: {
            DEFAULT: 'rgb(var(--color-button-warning))',
            hover: 'rgb(var(--color-button-warning-hover))',
            text: 'rgb(var(--color-button-warning-text))',
          },
          disabled: {
            DEFAULT: 'rgb(var(--color-button-disabled))',
            text: 'rgb(var(--color-button-disabled-text))',
          },
        },
      },

      textColor: {
        DEFAULT: 'rgb(var(--color-text))',
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
};
export default config;
