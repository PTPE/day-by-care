'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import signOut from '@/actions/signOut';
import ThemeToggler from '@/ui/themeToggler';
import Logo from '@/ui/logo';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1 bg-secondary shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] p-2">
      <div className="flex items-center justify-between w-full max-w-[1190px] mx-auto ">
        <Link href="/">
          <Logo size="md" className="cursor-pointer" />
        </Link>

        <div className="flex items-center gap-5">
          <Link href="clients">
            <button
              type="button"
              className={`${pathname.includes('clients') ? 'border-b-4 border-accent' : 'border-b-0'}`}
            >
              案主個表
            </button>
          </Link>
          <Link href="reports">
            <button
              type="button"
              className={`${pathname.includes('reports') ? 'border-b-4 border-accent' : 'border-b-0'}`}
            >
              月結總表
            </button>
          </Link>
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
    </div>
  );
}
