'use client';

import { ClientList as ClientListType } from '@/features/dashboard/types';

import ClientListItem from './_client-list-item';

type ClientListProps = {
  clientList: ClientListType;
  selectedClientId: string;
};

export default function ClientList({
  clientList,
  selectedClientId,
}: ClientListProps) {
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
