'use client';

import { Client } from '@/types/client';
import Checkbox from '@/ui/checkbox';
import Label from '@/ui/label';

type Props = {
  clientId: string;
  clientName: string;
  selectedClients: Client[];
  onHandleSelectClient: (clientId: string) => void;
};

export default function ClientItem({
  clientId,
  clientName,
  selectedClients,
  onHandleSelectClient,
}: Props) {
  const isChecked = selectedClients.some(
    (client) => client.clientId === clientId
  );

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={clientId}
        onClick={() => onHandleSelectClient(clientId)}
        checked={isChecked}
      />
      <Label htmlFor={clientId}>{clientName}</Label>
    </div>
  );
}
