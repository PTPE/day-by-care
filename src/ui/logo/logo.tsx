import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import cn from '@/utils/cn';
import LogoImage from '@/icons/logo.png';

const logoVariants = cva(
  'flex items-center gap-3 font-bold tracking-widest py-2 rounded-full',
  {
    variants: {
      size: {
        sm: 'h-10 text-xl',
        md: 'h-16 text-2xl',
        lg: 'h-24 text-3xl',
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
    {/* <Dog className="h-full grow" /> */}
    <img src={LogoImage.src} alt="logo" className="h-full" />
    <div className="flex flex-col h-full justify-around">
      <p className="flex-shrink-0 tracking-[5px]">日日安</p>
      <p className="flex-shrink-0 text-xs">Day By Care</p>
    </div>
  </div>
));

Logo.displayName = 'Logo';

export default Logo;
