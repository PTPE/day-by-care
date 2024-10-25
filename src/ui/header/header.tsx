import Link from 'next/link';

import ThemeToggler from '@/ui/themeToggler';
import Logo from '@/ui/logo';

type Props = {
  middleChildren?: React.ReactNode;
  endChildren?: React.ReactNode;
};

export default function Header({ middleChildren, endChildren }: Props) {
  return (
    <div className="flex flex-col gap-1 bg-secondary shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] p-2">
      <div className="flex items-center justify-between max-w-[1190px] w-full flex-grow mx-auto">
        <Link href="/">
          <Logo size="md" className="cursor-pointer" />
        </Link>
        {middleChildren}
        <div className="flex items-center gap-2">
          {endChildren}
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}
