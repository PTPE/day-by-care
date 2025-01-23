import getClientsAction from '@/features/client/actions/get-clients-action';

import ClientListItem from './_client-list-item';

export default async function ClientList() {
  const clients = await getClientsAction();

  return (
    <div className="grid grid-cols-4 gap-4 place-items-center">
      {clients.map((client) => (
        <ClientListItem key={client.client_id} client={client} />
      ))}
    </div>
  );
}
