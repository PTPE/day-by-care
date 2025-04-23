import type { Config } from 'tailwindcss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { addDynamicIconSelectors } from '@iconify/tailwind';

const config: Config = {
  darkMode: ['class'],
  safelist: [
    'icon-[openmoji--old-woman-dark-skin-tone]',
    'icon-[openmoji--old-woman-light-skin-tone]',
    'icon-[openmoji--old-woman-medium-dark-skin-tone]',
    'icon-[openmoji--old-woman-medium-light-skin-tone]',
    'icon-[openmoji--old-woman-medium-skin-tone]',
    'icon-[twemoji--old-woman]',
    'icon-[twemoji--old-woman-dark-skin-tone]',
    'icon-[twemoji--old-woman-light-skin-tone]',
    'icon-[twemoji--old-woman-medium-dark-skin-tone]',
    'icon-[twemoji--old-woman-medium-light-skin-tone]',
    'icon-[twemoji--old-woman-medium-skin-tone]',
    'icon-[noto--old-woman]',
    'icon-[noto--old-woman-dark-skin-tone]',
    'icon-[noto--old-woman-light-skin-tone]',
    'icon-[noto--old-woman-medium-dark-skin-tone]',
    'icon-[noto--old-woman-medium-light-skin-tone]',
    'icon-[noto--old-woman-medium-skin-tone]',
    'icon-[fluent-emoji--old-woman]',
    'icon-[fluent-emoji--old-woman-dark]',
    'icon-[fluent-emoji--old-woman-light]',
    'icon-[fluent-emoji--old-woman-medium]',
    'icon-[fluent-emoji--old-woman-medium-dark]',
    'icon-[fluent-emoji--old-woman-medium-light]',
    'icon-[fluent-emoji-flat--old-woman]',
    'icon-[fluent-emoji-flat--old-woman-dark]',
    'icon-[fluent-emoji-flat--old-woman-light]',
    'icon-[fluent-emoji-flat--old-woman-medium]',
    'icon-[fluent-emoji-flat--old-woman-medium-dark]',
    'icon-[fluent-emoji-flat--old-woman-medium-light]',
    'icon-[fluent-emoji-high-contrast--old-woman]',
    'icon-[noto-v1--old-woman]',
    'icon-[noto-v1--old-woman-dark-skin-tone]',
    'icon-[noto-v1--old-woman-light-skin-tone]',
    'icon-[noto-v1--old-woman-medium-dark-skin-tone]',
    'icon-[noto-v1--old-woman-medium-light-skin-tone]',
    'icon-[noto-v1--old-woman-medium-skin-tone]',
    'icon-[emojione--old-woman]',
    'icon-[emojione--old-woman-dark-skin-tone]',
    'icon-[emojione--old-woman-light-skin-tone]',
    'icon-[emojione--old-woman-medium-dark-skin-tone]',
    'icon-[emojione--old-woman-medium-light-skin-tone]',
    'icon-[emojione--old-woman-medium-skin-tone]',
    'icon-[emojione-monotone--old-woman]',
    'icon-[emojione-v1--old-woman]',
    'icon-[streamline-emojis--old-woman-1]',
    'icon-[streamline-emojis--old-woman-2]',
    'icon-[openmoji--old-man]',
    'icon-[openmoji--old-man-dark-skin-tone]',
    'icon-[openmoji--old-man-light-skin-tone]',
    'icon-[openmoji--old-man-medium-dark-skin-tone]',
    'icon-[openmoji--old-man-medium-light-skin-tone]',
    'icon-[openmoji--old-man-medium-skin-tone]',
    'icon-[twemoji--old-man]',
    'icon-[twemoji--old-man-dark-skin-tone]',
    'icon-[twemoji--old-man-light-skin-tone]',
    'icon-[twemoji--old-man-medium-dark-skin-tone]',
    'icon-[twemoji--old-man-medium-light-skin-tone]',
    'icon-[twemoji--old-man-medium-skin-tone]',
    'icon-[noto--old-man]',
    'icon-[noto--old-man-dark-skin-tone]',
    'icon-[noto--old-man-light-skin-tone]',
    'icon-[noto--old-man-medium-dark-skin-tone]',
    'icon-[noto--old-man-medium-light-skin-tone]',
    'icon-[noto--old-man-medium-skin-tone]',
    'icon-[fluent-emoji--old-man]',
    'icon-[fluent-emoji--old-man-dark]',
    'icon-[fluent-emoji--old-man-light]',
    'icon-[fluent-emoji--old-man-medium]',
    'icon-[fluent-emoji--old-man-medium-dark]',
    'icon-[fluent-emoji--old-man-medium-light]',
    'icon-[fluent-emoji-flat--old-man]',
    'icon-[fluent-emoji-flat--old-man-dark]',
    'icon-[fluent-emoji-flat--old-man-light]',
    'icon-[fluent-emoji-flat--old-man-medium]',
    'icon-[fluent-emoji-flat--old-man-medium-dark]',
    'icon-[fluent-emoji-flat--old-man-medium-light]',
    'icon-[fluent-emoji-high-contrast--old-man]',
    'icon-[noto-v1--old-man]',
    'icon-[noto-v1--old-man-dark-skin-tone]',
    'icon-[noto-v1--old-man-light-skin-tone]',
    'icon-[noto-v1--old-man-medium-dark-skin-tone]',
    'icon-[noto-v1--old-man-medium-light-skin-tone]',
    'icon-[noto-v1--old-man-medium-skin-tone]',
    'icon-[emojione--old-man]',
    'icon-[emojione--old-man-dark-skin-tone]',
    'icon-[emojione--old-man-light-skin-tone]',
    'icon-[emojione--old-man-medium-dark-skin-tone]',
    'icon-[emojione--old-man-medium-light-skin-tone]',
    'icon-[emojione--old-man-medium-skin-tone]',
    'icon-[emojione-monotone--old-man]',
    'icon-[emojione-v1--old-man]',
    'icon-[streamline-emojis--old-man-1]',
    'icon-[streamline-emojis--old-man-2]',
    // 'bg-orange-700',
  ],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/icons/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
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
        warning: 'hsla(var(--color-destructive))',
        line: 'hsla(var(--line))',
        button: {
          primary: {
            DEFAULT: 'hsla(var(--primary))',
          },
          secondary: {
            DEFAULT: 'hsla(var(--secondary))',
          },
          accent: {
            DEFAULT: 'hsla(var(--accent))',
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
        },
        secondary: {
          DEFAULT: 'hsla(var(--secondary-background))',
        },
      },

      // backgroundColor: {
      //   primary: {
      //     DEFAULT: 'hsla(var(--primary-background))',
      //     button: {
      //       DEFAULT: 'hsla(var(--primary))',
      //     },
      //   },
      //   secondary: {
      //     DEFAULT: 'hsla(var(--secondary-background))',
      //     button: {
      //       DEFAULT: 'hsla(var(--secondary))',
      //     },
      //   },
      //   accent: {
      //     DEFAULT: 'hsla(var(--accent))',
      //     button: {
      //       DEFAULT: 'hsla(var(--accent))',
      //     },
      //   },
      //   destructive: {
      //     DEFAULT: 'hsla(var(--destructive))',
      //     button: {
      //       DEFAULT: 'hsla(var(--destructive))',
      //     },
      //   },
      //   line: {
      //     DEFAULT: 'hsla(var(--line-background))',
      //   },
      // },

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
  // eslint-disable-next-line global-require
  plugins: [addDynamicIconSelectors(), require('tailwindcss-animate')],
};
export default config;
