'use client ';

import Link from 'next/link';

import Button from '@/ui/button/button';
import ClientList from '@/features/client/components/client-list';
import routes from '@/const/routes';

export default function Clients() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-3xl">案主列表</h1>

      <div className="flex justify-between items-center">
        <search className="w-fit flex flex-row items-center gap-3 border-2 rounded-full h-10 bg-secondary p-3 pr-0">
          <input
            type="text"
            className="bg-secondary h-full rounded-full rounded-r-none focus:outline-none p-3"
          />
          <Button className="rounded-full">搜尋</Button>
        </search>

        <Link href={routes.NewClients()}>
          <Button className="w-fit" color="accent">
            新增案主
          </Button>
        </Link>
      </div>

      <ClientList />
    </div>
  );
}
