import React, { forwardRef } from 'react';

type Props = { children?: React.ReactNode; className?: string };

const CalendarCell = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={`rounded bg-secondary shadow-md px-6 py-3 h-full ${className}`}
    >
      {children}
    </div>
  )
);

export default CalendarCell;
