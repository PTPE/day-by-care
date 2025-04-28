/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useRef } from 'react';

import ClientServiceRecordDialog, {
  ClientServiceRecordDialogRef,
} from '@/features/report/components/client-service-record-dialog';

export default function ClientServiceCard() {
  const clientServiceRecordDialogRef =
    useRef<ClientServiceRecordDialogRef>(null);

  return (
    <>
      <div
        className="bg-card rounded-lg p-5 grid grid-cols-[2fr_1fr] gap-3 cursor-pointer"
        onClick={() => clientServiceRecordDialogRef.current?.open()}
      >
        <div className="text-lg font-bold">秋津田</div>

        <div className="font-bold text-lg text-accent ml-auto">42.5小時</div>

        <div className="flex text-sm gap-2">
          <div className="bg-tertiary text-tertiary-foreground rounded-lg px-2 py-1">
            居家服務
          </div>
          <div className="bg-tertiary text-tertiary-foreground rounded-lg px-2 py-1">
            陪同就醫
          </div>
        </div>

        <div className="icon-[material-symbols--arrow-forward-ios-rounded] ml-auto text-muted-foreground" />

        <div className="text-sm text-muted-foreground">共服務2天</div>
      </div>

      <ClientServiceRecordDialog ref={clientServiceRecordDialogRef} />
    </>
  );
}
