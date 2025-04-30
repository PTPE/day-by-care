'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Input from '@/ui/input';

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      placeholder="搜尋案主..."
      className="bg-card max-w-96"
      onChange={handleSearch}
    />
  );
}
