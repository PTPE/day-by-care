'use client';

import { Client } from '@/types/client';

import ClientItem from './_client_item';

type Props = {
  clients: Client[];
  selectedClients: Client[];
  onHandleSelectClient: (clientId: string) => void;
};

export default function SelectExportClient({
  selectedClients,
  onHandleSelectClient,
  clients,
}: Props) {
  return (
    <div className="bg-card p-4 rounded-lg flex flex-col gap-2">
      <div className="font-bold">選擇匯出的案主</div>

      <div className="flex gap-2">
        {clients?.map((client) => (
          <ClientItem
            selectedClients={selectedClients}
            onHandleSelectClient={onHandleSelectClient}
            key={client.clientId}
            clientId={client.clientId}
            clientName={client.clientName}
          />
        ))}
      </div>
    </div>
  );
}
