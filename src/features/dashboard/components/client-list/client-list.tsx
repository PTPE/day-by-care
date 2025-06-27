'use client';

import { useGetClients } from '@/hooks/query';

import ClientListItem from './_client-list-item';

type Props = {
  selectedClientId: string;
};

export default function ClientList({ selectedClientId }: Props) {
  const { data: clientList } = useGetClients();

  return (
    <div className="flex gap-2 overflow-y-auto py-3">
      {clientList?.map((client) => (
        <ClientListItem
          key={client.clientId}
          clientId={client.clientId}
          clientName={client.clientName}
          isSelected={selectedClientId === client.clientId}
        />
      ))}
    </div>
  );
}
