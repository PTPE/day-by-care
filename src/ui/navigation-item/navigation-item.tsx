'use client';

import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';

import { usePathname } from 'next/navigation';
import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';

import cn from '@/utils/cn';

const navigationItemVariants = cva(
  'group relative list-none flex items-center justify-center flex-col font-semibold',
  {
    variants: {
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        warning: 'text-warning',
        disabled: 'text-disabled',
      },
      size: {
        sm: 'px-3 h-[32px]',
        md: 'px-6 h-[36px]',
        lg: 'px-9 h-[48px]',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
);

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
  VariantProps<typeof navigationItemVariants> & {
    href: string;
    children: React.ReactNode;
  };

const NavigationItem = forwardRef<HTMLLIElement, Props>(
  ({ children, href, size, color, className, ...others }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
      <li
        {...others}
        ref={ref}
        className={cn(navigationItemVariants({ color, size, className }))}
      >
        <Link href={href}>{children}</Link>
        <div
          className={cn(
            'absolute w-3/5 h-[3px] bottom-0 transition-all',
            isActive ? 'bg-accent' : 'bg-transparent group-hover:bg-accent'
          )}
        />
      </li>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

export default NavigationItem;
