'use client';

import { useSearchParams } from 'next/navigation';

import { useGetClients } from '@/features/client/hooks/useClientsQuery.client';

import ClientExpandableCard from './_client-expandable-card';

export default function ClientList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const { data: clients } = useGetClients({ searchParams: search || '' });

  return (
    <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3">
      {clients?.map((client) => (
        <ClientExpandableCard key={client.client_id} client={client} />
      ))}
    </div>
  );
}
