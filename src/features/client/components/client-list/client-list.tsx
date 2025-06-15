'use client';

import { useSearchParams } from 'next/navigation';

import LoadingSpinner from '@/ui/loading-spinner';
import { useGetClients } from '@/hooks/query';

import ClientExpandableCard from './_client-expandable-card';

export default function ClientList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const { data: clients, isLoading } = useGetClients({
    clientName: search || '',
  });

  return (
    <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-10 lg:grid-cols-3">
      {isLoading && <LoadingSpinner />}
      {clients?.map((client) => (
        <ClientExpandableCard key={client.clientId} client={client} />
      ))}
    </div>
  );
}
