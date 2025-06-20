import Link from 'next/link';

import Logo from '@/ui/logo';
import Navigation from '@/ui/navigation';

export default function Header() {
  return (
    <div className="flex lg:bg-primary lg:shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] rounded-lg lg:px-10">
      <div className="flex items-center gap-14 w-full flex-grow mx-auto py-3 justify-center lg:justify-between">
        <Link href="/">
          <Logo size="md" className="cursor-pointer" />
        </Link>

        <div className="hidden lg:flex lg:flex-1">
          <Navigation />
        </div>
      </div>
    </div>
  );
}
