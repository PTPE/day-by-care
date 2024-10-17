import Link from 'next/link';

import ThemeToggler from '@/ui/themeToggler';
import Logo from '@/ui/logo';
import Button from '@/ui/button/button';

export default function Header() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Logo size="md" className="cursor-pointer" />
        </Link>

        <div className="flex items-center gap-2">
          <Link href="signIn">
            <Button variant="outline" size="sm">
              登入
            </Button>
          </Link>

          <Link href="signUp">
            <Button size="sm">註冊</Button>
          </Link>
          <ThemeToggler />
        </div>
      </div>
      <div className="w-full h-[1px] bg-line" />
    </div>
  );
}
