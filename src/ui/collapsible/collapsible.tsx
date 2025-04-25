/* eslint-disable import/no-extraneous-dependencies */

import * as React from 'react';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

import { cn } from '@/lib/utils';

const Collapsible = CollapsiblePrimitive.Root;

const { CollapsibleTrigger } = CollapsiblePrimitive;

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleContent
    ref={ref}
    className={cn(
      'overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up',
      className
    )}
    {...props}
  />
));

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
