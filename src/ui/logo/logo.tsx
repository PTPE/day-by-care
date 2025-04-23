import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import cn from '@/utils/cn';

import { Dog } from './_dog';

const logoVariants = cva(
  'flex items-center gap-3 font-bold tracking-widest py-2 rounded-full',
  {
    variants: {
      size: {
        sm: 'h-10 text-xl',
        md: 'h-12 text-2xl',
        lg: 'h-14 text-3xl',
      },
    },

    defaultVariants: {
      size: 'md',
    },
  }
);

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  VariantProps<typeof logoVariants>;

const Logo = forwardRef<HTMLDivElement, Props>(({ size, className }, ref) => (
  <div ref={ref} className={cn(logoVariants({ size, className }))}>
    <Dog className="h-full grow" />
    <p className="flex-shrink-0 text-lg md:text-xl">寵愛照護表</p>
  </div>
));

Logo.displayName = 'Logo';

export default Logo;
