'use client';

import { Client } from '@/types/client';

import ClientListItem from './_client-list-item';

type Props = {
  selectedClientId: string;
  clientList: Client[];
};

export default function ClientList({ selectedClientId, clientList }: Props) {
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
