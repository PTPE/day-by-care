import Link from 'next/link';

import ThemeToggler from '@/ui/themeToggler';
import Logo from '@/ui/logo';

export default function Header() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Logo size="md" className="cursor-pointer" />
        </Link>
        <ThemeToggler />
      </div>
      <div className="w-full h-[1px] bg-line" />
    </div>
  );
}
