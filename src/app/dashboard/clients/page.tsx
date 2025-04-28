'use client ';

import Link from 'next/link';

import ClientExpandableCard from '@/features/client/components/client-expandable-card';
import Input from '@/ui/input';
import Button from '@/ui/button';

export default function Clients() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-5 md:justify-start">
        <Input placeholder="搜尋案主..." className="bg-card max-w-96" />
        <Link href="/dashboard/clients/create">
          <Button>
            <div className="icon-[material-symbols-light--add-circle-rounded]" />
            新增
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        <ClientExpandableCard />
        <ClientExpandableCard />
        <ClientExpandableCard />
        <ClientExpandableCard />
      </div>
    </div>
  );
}
