import { VariantProps, cva } from 'class-variance-authority';
import { Dog } from './_dog';
import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import cn from 'app/_utils/cn';

const logoVariants = cva(
  'flex items-center gap-3 font-bold tracking-widest bg-accent/50 px-4 py-2 rounded-full',
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

const Logo = forwardRef<HTMLDivElement, Props>(({ size }, ref) => {
  return (
    <div ref={ref} className={cn(logoVariants({ size }))}>
      <Dog className="h-full grow" />
      <p className="">寵愛照護表</p>
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
