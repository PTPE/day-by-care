'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import Switch from '@/ui/switch';

import { Sun } from './_sun';
import { Moon } from './_moon';

export default function ThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Switch
      onChange={(checked) => setTheme(checked ? 'light' : 'dark')}
      defaultChecked={theme === 'light'}
      rightOption={{ render: <Sun /> }}
      leftOption={{ render: <Moon /> }}
      size="md"
    />
  );
}
