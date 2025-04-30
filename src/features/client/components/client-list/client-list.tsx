'use client';

import { useGetClients } from '@/features/client/hooks/useClientsQuery.client';

import ClientExpandableCard from './_client-expandable-card';

export default function ClientList() {
  const { data: clients } = useGetClients();

  return (
    <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3">
      {clients?.map((client) => (
        <ClientExpandableCard key={client.client_id} client={client} />
      ))}
    </div>
  );
}
