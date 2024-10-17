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
      },

      backgroundColor: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary-bg))',
          button: {
            DEFAULT: 'rgb(var(--color-button-primary-bg))',
            hover: 'rgb(var(--color-button-primary-bg-hover))',
          },
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary-bg))',
          button: {
            DEFAULT: 'rgb(var(--color-button-secondary-bg))',
            hover: 'rgb(var(--color-button-secondary-bg-hover))',
          },
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent))',
          button: {
            DEFAULT: 'rgb(var(--color-button-accent-bg))',
            hover: 'rgb(var(--color-button-accent-bg-hover))',
          },
        },
        warning: {
          DEFAULT: 'rgb(var(--color-button-warning))',
          button: {
            DEFAULT: 'rgb(var(--color-button-warning))',
            hover: 'rgb(var(--color-button-warning-hover))',
          },
        },
        disabled: {
          DEFAULT: 'rgb(var(--color-button-disabled))',
          button: {
            DEFAULT: 'rgb(var(--color-button-disabled))',
          },
        },
      },

      textColor: {
        DEFAULT: 'rgb(var(--color-text))',

        primary: {
          DEFAULT: 'rgb(var(--color-primary))',
          button: {
            DEFAULT: 'rgb(var(--color-button-primary-text))',
          },
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary))',
          button: {
            DEFAULT: 'rgb(var(--color-button-secondary-text))',
          },
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent))',
          button: {
            DEFAULT: 'rgb(var(--color-button-accent-text))',
          },
        },
        warning: {
          DEFAULT: 'rgb(var(--color-button-warning-text))',
          button: {
            DEFAULT: 'rgb(var(--color-button-warning-text))',
          },
        },
        disabled: {
          DEFAULT: 'rgb(var(--color-button-disabled-text))',
          button: {
            DEFAULT: 'rgb(var(--color-button-disabled-text))',
          },
        },
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '75%': { transform: 'scale(20)', opacity: '0' },
          '100%': { transform: 'scale(20)', opacity: '0' },
        },
      },
      animation: {
        ripple: 'ripple 0.9s ease',
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
};
export default config;
