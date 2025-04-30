import Link from 'next/link';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import Button from '@/ui/button';
import SearchClient from '@/features/client/components/search-client';
import { usePrefetchClients } from '@/features/client/hooks/useClientsPrefetch.server';
import ClientList from '@/features/client/components/client-list/client-list';

export default async function Clients({
  searchParams,
}: {
  searchParams: string;
}) {
  const { queryClient, prefetchClients } = usePrefetchClients();

  await prefetchClients();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-5 md:justify-start">
          <SearchClient />
          <Link href="/dashboard/clients/create">
            <Button>
              <div className="icon-[material-symbols-light--add-circle-rounded]" />
              新增
            </Button>
          </Link>
        </div>

        <ClientList />
      </div>
    </HydrationBoundary>
  );
}
