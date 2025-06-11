'use client';

import { cn } from '@/lib/utils';

interface TabProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function Tab({ children, selected, onClick }: TabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'p-1 w-full rounded-lg text-sm font-bold transition-colors',
        selected ? 'bg-card text-primary' : 'text-muted-foreground'
      )}
    >
      {children}
    </button>
  );
}
