'use client';

import Link from 'next/link';

import signOut from '@/actions/signOut';
import ThemeToggler from '@/ui/themeToggler';
import Logo from '@/ui/logo';

export default function Header() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Logo size="md" className="cursor-pointer" />
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={async () => signOut()}
            type="button"
            className="border-2 border-transparent bg-button-primary text-button-primary hover:bg-button-primary-hover hover:border-transparent px-3 py-1 rounded-lg"
          >
            登出
          </button>

          <ThemeToggler />
        </div>
      </div>
      <div className="w-full h-[1px] bg-line" />
    </div>
  );
}
