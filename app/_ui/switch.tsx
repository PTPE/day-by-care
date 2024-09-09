'use client';

import { forwardRef, useState } from 'react';

import { VariantProps, cva } from 'class-variance-authority';
import { v4 as uuid } from 'uuid';

import cn from 'app/_utils/cn';
import { ClassValue } from 'clsx';

const switchVariants = cva(
  'relative cursor-pointer transition-all flex items-center rounded-full',
  {
    variants: {
      size: {
        default: 'w-12 h-6',
        sm: 'w-10 h-5',
        md: 'w-14 h-7',
        lg: 'w-20 h-10',
      },
    },

    defaultVariants: {
      size: 'default',
    },
  }
);

type Props = React.LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof switchVariants> & {
    onChange?: (checked: boolean) => void;
    defaultChecked?: boolean;
    leftOption?: {
      render?: React.ReactNode;
      color?: ClassValue;
    };
    rightOption?: {
      render?: React.ReactNode;
      color?: ClassValue;
    };
  };

const Switch = forwardRef<HTMLDivElement, Props>(
  (
    { size, rightOption, leftOption, className, onChange, defaultChecked },
    ref
  ) => {
    const id = uuid();

    const [checked, setChecked] = useState(defaultChecked || false);

    const leftOptionColor = {
      switchBgColor: rightOption?.color
        ? `${rightOption?.color}/20`
        : 'bg-button-accent/20',
      toggleColor: rightOption?.color
        ? `${rightOption?.color}`
        : 'bg-button-accent',
    };
    const rightOptionColor = {
      switchBgColor: leftOption?.color
        ? `${leftOption?.color}/20`
        : 'bg-button-primary/20',
      toggleColor: leftOption?.color
        ? `${leftOption?.color}`
        : 'bg-button-primary',
    };

    return (
      <div ref={ref}>
        <input
          type="checkbox"
          id={id}
          className="hidden"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            onChange?.(e.target.checked);
          }}
        />
        <label
          htmlFor={id}
          className={`p-[2px] ${checked ? leftOptionColor.switchBgColor : rightOptionColor.switchBgColor} ${cn(switchVariants({ size }), className)}`}
        >
          {rightOption?.render && checked && (
            <div className="absolute w-1/2 grow flex justify-center items-center">
              <span className="block">{rightOption.render}</span>
            </div>
          )}

          <span
            className={`rounded-full block h-full aspect-square transition-all ${checked ? `translate-x-[calc(100%_+_4px)] ${leftOptionColor.toggleColor}` : `translate-x-0 ${rightOptionColor.toggleColor}`}`}
          />

          {leftOption?.render && !checked && (
            <div className="absolute w-1/2 translate-x-[calc(100%_-_4px)] -z-10 grow flex justify-center items-center">
              <span className="block">{leftOption.render}</span>
            </div>
          )}
        </label>
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
