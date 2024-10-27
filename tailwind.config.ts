import type { Config } from 'tailwindcss';
import { addDynamicIconSelectors } from '@iconify/tailwind';

const config: Config = {
  darkMode: ['class'],
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
        primary: {
          DEFAULT: 'hsla(var(--primary))',
          foreground: 'hsla(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsla(var(--secondary))',
          foreground: 'hsla(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsla(var(--accent))',
          foreground: 'hsla(var(--accent-foreground))',
        },
        warning: 'rgb(var(--color-warning))',
        line: 'rgb(var(--color-line))',
        background: {
          primary: {
            DEFAULT: 'hsla(var(--primary-background))',
          },
          secondary: {
            DEFAULT: 'hsla(var(--secondary-background))',
          },
        },
        foreground: 'hsla(var(--foreground))',
        card: {
          DEFAULT: 'hsla(var(--card))',
          foreground: 'hsla(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsla(var(--popover))',
          foreground: 'hsla(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsla(var(--muted))',
          foreground: 'hsla(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsla(var(--destructive))',
          foreground: 'hsla(var(--destructive-foreground))',
        },
        border: 'hsla(var(--border))',
        input: 'hsla(var(--input))',
        ring: 'hsla(var(--ring))',
        chart: {
          '1': 'hsla(var(--chart-1))',
          '2': 'hsla(var(--chart-2))',
          '3': 'hsla(var(--chart-3))',
          '4': 'hsla(var(--chart-4))',
          '5': 'hsla(var(--chart-5))',
        },
      },

      backgroundColor: {
        primary: {
          DEFAULT: 'hsla(var(--primary-background))',
          button: {
            DEFAULT: 'hsla(var(--primary-button-background))',
          },
        },
        secondary: {
          DEFAULT: 'hsla(var(--secondary-background))',
          button: {
            DEFAULT: 'hsla(var(--secondary-button-background))',
          },
        },
        accent: {
          DEFAULT: 'hsla(var(--accent))',
          button: {
            DEFAULT: 'hsla(var(--accent-button-background))',
          },
        },
      },

      keyframes: {
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0.5',
          },
          '75%': {
            transform: 'scale(20)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(20)',
            opacity: '0',
          },
        },
      },
      animation: {
        ripple: 'ripple 0.9s ease',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [addDynamicIconSelectors(), require('tailwindcss-animate')],
};
export default config;
