import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { ClientPreview } from '@/features/client/types/client';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import { useGetClientsForServer } from '@/features/client/hooks/useGetClients';

import ClientListItem from './_client-list-item';

export default async function ClientList() {
  const { prefetchClients, queryClient } = useGetClientsForServer();

  await prefetchClients();

  const clients: ClientPreview[] =
    queryClient.getQueryData([QUERY_KEYS.CLIENTS]) || [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-wrap gap-5">
        {clients.map((client) => (
          <ClientListItem key={client.client_id} client={client} />
        ))}
      </div>
    </HydrationBoundary>
  );
}
