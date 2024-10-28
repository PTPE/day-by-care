// import { forwardRef } from 'react';

// type Props = {
//   helperText?: string;
//   size?: 'sm' | 'md' | 'lg';
//   color?: 'primary' | 'secondary' | 'accent' | 'warning' | 'disabled';
//   label?: string;
//   className?: string;
//   placeholder?: string;
//   error?: boolean;
// };

// const Input = forwardRef<HTMLFieldSetElement, Props>(
//   (
//     {
//       helperText,
//       size,
//       color = 'secondary',
//       label,
//       className,
//       placeholder,
//       error = false,
//       ...others
//     },
//     ref
//   ) => {
//     const inputSize = {
//       sm: 'px-1 py-0.5',
//       md: 'px-2 py-1',
//       lg: 'px-4 py-2',
//     };

//     return (
//       <fieldset
//         className="relative border-2 border-primary w-fit has-[:focus]:border-accent rounded-[5px] "
//         ref={ref}
//         {...others}
//       >
//         <input
//           placeholder=" "
//           className={`${inputSize[size || 'md']} outline-none mb-1 peer rounded-[5px]`}
//         />
//         {label && (
//           <legend className="ml-2 text-sm w-[0.01px] peer-focus:w-auto peer-[:not(:placeholder-shown)]:w-auto peer-[:not(:placeholder-shown)]:p-1 h-3 overflow-hidden peer-focus:p-1 opacity-0">
//             <span>{label}</span>
//           </legend>
//         )}
//         {label && (
//           <label
//             className={`absolute left-0 -top-[4px] ${inputSize[size || 'md']} h-full flex items-center pointer-events-none peer-focus:-translate-y-1/2 peer-focus:text-sm peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-sm transition-all ml-1 duration-75`}
//           >
//             {label}
//           </label>
//         )}
//       </fieldset>
//     );
//   }
// );

// Input.displayName = 'Input';

// export default Input;
'use client';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export default Input;
