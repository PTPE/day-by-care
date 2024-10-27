// 'use client';
// import cn from '@/utils/cn';
// import { VariantProps, cva } from 'class-variance-authority';
// import {
//   ButtonHTMLAttributes,
//   DetailedHTMLProps,
//   forwardRef,
//   useImperativeHandle,
//   useRef,
// } from 'react';

// const buttonVariants = cva('relative rounded-lg overflow-hidden', {
//   variants: {
//     color: {
//       primary:
//         'text-primary-button bg-primary-button hover:bg-primary-button-hover',
//       secondary:
//         'text-secondary-button bg-secondary-button hover:bg-secondary-button-hover',
//       accent:
//         'text-accent-button bg-accent-button hover:bg-accent-button-hover',
//       warning:
//         'text-warning-button bg-warning-button hover:bg-warning-button-hover',
//       disabled: 'bg-disabled-button text-disabled-button',
//     },
//     variant: {
//       text: 'bg-transparent',
//       contained: '',
//       outline: 'border-2',
//     },
//     size: {
//       sm: 'px-3 h-[32px]',
//       md: 'px-6 h-[36px]',
//       lg: 'px-9 h-[48px]',
//     },
//   },
//   compoundVariants: [
//     {
//       color: ['primary'],
//       variant: ['text'],
//       className: 'text-primary hover:bg-primary-button-hover/10',
//     },
//     {
//       color: ['primary'],
//       variant: ['outline'],
//       className:
//         'bg-transparent border-primary text-primary hover:bg-primary-button-hover/10',
//     },
//     {
//       color: ['secondary'],
//       variant: ['text'],
//       className: 'text-secondary hover:bg-secondary-button-hover/10',
//     },
//     {
//       color: ['secondary'],
//       variant: ['outline'],
//       className:
//         'bg-transparent border-secondary text-secondary hover:bg-secondary-button-hover/10',
//     },
//     {
//       color: ['accent'],
//       variant: ['text'],
//       className: 'text-accent hover:bg-accent-button-hover/10',
//     },
//     {
//       color: ['accent'],
//       variant: ['outline'],
//       className:
//         'bg-transparent border-accent text-accent hover:bg-accent-button-hover/10',
//     },
//     {
//       color: ['warning'],
//       variant: ['text'],
//       className: 'text-warning hover:bg-warning-button-hover/10',
//     },
//     {
//       color: ['warning'],
//       variant: ['outline'],
//       className:
//         'bg-transparent border-warning text-warning hover:bg-warning-button-hover/10',
//     },
//     {
//       color: ['disabled'],
//       variant: ['text'],
//       className: 'text-disabled cursor-not-allowed',
//     },
//     {
//       color: ['disabled'],
//       variant: ['outline'],
//       className:
//         'bg-transparent border border-disabled text-disabled cursor-not-allowed',
//     },
//   ],
//   defaultVariants: {
//     variant: 'contained',
//     color: 'primary',
//     size: 'md',
//   },
// });

// type Props = DetailedHTMLProps<
//   ButtonHTMLAttributes<HTMLButtonElement>,
//   HTMLButtonElement
// > &
//   VariantProps<typeof buttonVariants> & {
//     children: React.ReactNode;
//   };

// const Button = forwardRef<HTMLButtonElement, Props>(
//   ({ children, size, color, variant, className, onClick, ...others }, ref) => {
//     const buttonRef = useRef<HTMLButtonElement>(null);
//     useImperativeHandle(ref, () => buttonRef.current!);

//     function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
//       const button = buttonRef.current;

//       if (!button) return;

//       const buttonRect = button.getBoundingClientRect();
//       const buttonWidth = buttonRect.width;
//       const { left, top } = buttonRect;

//       const leftPosition = event.clientX - left - buttonWidth / 20;
//       const topPosition = event.clientY - top - buttonWidth / 20;
//       const ripple = document.createElement('span');

//       ripple.style.left = leftPosition + 'px';
//       ripple.style.top = topPosition + 'px';
//       ripple.style.width = buttonWidth / 10 + 'px';
//       ripple.style.height = buttonWidth / 10 + 'px';
//       ripple.className = `absolute bg-white scale-0 rounded-full animate-ripple cursor-pointer`;

//       button.appendChild(ripple);

//       setTimeout(() => {
//         button.removeChild(ripple);
//       }, 1500);

//       if (onClick) {
//         onClick(event);
//       }
//     }

//     return (
//       <button
//         {...others}
//         ref={buttonRef}
//         onClick={handleClick}
//         className={cn(buttonVariants({ size, color, variant, className }))}
//       >
//         {children}
//       </button>
//     );
//   }
// );
// Button.displayName = 'Button';

// export default Button;
'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary-button text-primary-foreground shadow hover:bg-primary-button/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-secondary-button/30',
        secondary:
          'bg-secondary-button text-secondary-foreground shadow-sm hover:bg-secondary-button-hover',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;
export { buttonVariants };
