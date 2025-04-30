'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {
  href: string;
  icon: string;
  label: string;
};

export default function NavigationItem({ href, icon, label }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} prefetch>
      <li className="flex flex-col items-center lg:flex-row lg:gap-2 font-semibold">
        <div
          className={`w-[6px] h-[6px] rounded-full transition-all lg:hidden ${isActive ? 'bg-button-primary' : 'bg-transparent group-hover:bg-accent'}`}
        />
        <div
          className={`${icon} w-8 h-8 ${isActive ? 'text-button-primary' : ''}`}
        />
        <div
          className={`text-[12px] md:text-sm flex-shrink-0 ${isActive ? 'text-button-primary' : ''}`}
        >
          {label}
        </div>
      </li>
    </Link>
  );
}
