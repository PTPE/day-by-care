'use  client';

import ClientListItem from './_client-list-item';

export default function ClientList() {
  return (
    <div className="flex gap-5 overflow-y-auto py-3">
      <ClientListItem selected />
      <ClientListItem selected={false} />
      <ClientListItem selected={false} />
      <ClientListItem selected={false} />
      <ClientListItem selected={false} />
      <ClientListItem selected={false} />
      <ClientListItem selected={false} />
      <ClientListItem selected={false} />
    </div>
  );
}
