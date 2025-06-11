/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useRef } from 'react';

import ClientServiceDetailDialog, {
  ClientServiceDetailDialogRef,
} from '@/features/report/components/client-service-detail-dialog';
import { ClientServiceSummary } from '@/features/report/types';
import { serviceItemMap } from '@/const/service-items';

type Props = {
  client: ClientServiceSummary;
};

export default function ClientServiceCard({ client }: Props) {
  const clientServiceDetailDialogRef =
    useRef<ClientServiceDetailDialogRef>(null);

  return (
    <>
      <div
        className="bg-card rounded-lg p-5 grid grid-cols-[2fr_1fr] gap-3 cursor-pointer"
        onClick={() => clientServiceDetailDialogRef.current?.open()}
      >
        <div className="text-lg font-bold">{client.clientName}</div>

        <div className="font-bold text-lg text-accent ml-auto">
          {client.totalServiceHours}小時
        </div>

        <div className="flex text-sm gap-2">
          {client.serviceItemIds.map((serviceItemId) => (
            <div
              key={serviceItemId}
              className="bg-tertiary text-tertiary-foreground rounded-lg px-2 py-1"
            >
              {serviceItemMap[serviceItemId]}
            </div>
          ))}
        </div>

        <div className="icon-[material-symbols--arrow-forward-ios-rounded] ml-auto text-muted-foreground" />

        <div className="text-sm text-muted-foreground">
          共服務{client.serviceItemIdDays}天
        </div>
      </div>

      <ClientServiceDetailDialog
        ref={clientServiceDetailDialogRef}
        clientId={client.clientId}
        clientName={client.clientName}
        totalServiceHours={client.totalServiceHours}
      />
    </>
  );
}
