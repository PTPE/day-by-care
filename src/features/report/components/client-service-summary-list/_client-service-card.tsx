/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useRef } from 'react';

import ClientServiceDetailDialog, {
  ClientServiceDetailDialogRef,
} from '@/features/report/components/client-service-detail-dialog';
import { serviceItemMap } from '@/const/service-items';
import { Client, Schedule } from '@/types/client';
import calculateTotalServiceHours from '@/utils/calculate-total-service-time-in-hours';

type Props = {
  schedule: Schedule;
  client: Client;
};

export default function ClientServiceCard({ schedule, client }: Props) {
  const clientServiceDetailDialogRef =
    useRef<ClientServiceDetailDialogRef>(null);

  const totalHours = calculateTotalServiceHours(schedule.serviceTime);

  const serviceDay = new Set(schedule.serviceTime.map((time) => time.date))
    .size;

  return (
    <>
      <div
        className="bg-card rounded-lg p-5 grid grid-cols-[2fr_1fr] gap-3 cursor-pointer"
        onClick={() => clientServiceDetailDialogRef.current?.open()}
      >
        <div className="text-lg font-bold">{schedule.clientName}</div>

        <div className="font-bold text-lg text-accent ml-auto">
          {totalHours}小時
        </div>

        <div className="flex text-sm gap-2 flex-wrap">
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
          共服務{serviceDay}天
        </div>
      </div>

      <ClientServiceDetailDialog
        ref={clientServiceDetailDialogRef}
        clientId={client.clientId}
        clientName={client.clientName}
        totalServiceHours={totalHours}
      />
    </>
  );
}
