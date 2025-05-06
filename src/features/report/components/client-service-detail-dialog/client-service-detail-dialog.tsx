import { forwardRef, useImperativeHandle, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/ui/dialog';
import useReportUrlParams from '@/features/report/hooks/useReportUrlParams';
import { useGetClientServiceDetail } from '@/features/report/hooks/useReportQuery.client';

import ServiceLogPerDay from './_service-log-per-day';

type Props = {
  clientName: string;
  clientId: string;
  totalServiceHours: number;
};

export type ClientServiceDetailDialogRef = {
  open: () => void;
  close: () => void;
};

const ClientServiceDetailDialog = forwardRef<
  ClientServiceDetailDialogRef,
  Props
>(({ clientId, totalServiceHours, clientName }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const { year, month } = useReportUrlParams();

  const { data: serviceLogs } = useGetClientServiceDetail({
    params: {
      clientId,
      year: Number(year),
      month: Number(month),
    },
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogDescription />
      <DialogContent className="w-[95%] rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-primary font-bold text-lg">
          {clientName}-{year}年{month}月
        </DialogTitle>
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">服務記錄</div>
          <div className="bg-accent text-primary-foreground rounded-lg px-2 py-1">
            總時數：{totalServiceHours}小時
          </div>
        </div>
        {serviceLogs?.map((log) => (
          <ServiceLogPerDay key={log.scheduleId} serviceLog={log} />
        ))}
      </DialogContent>
    </Dialog>
  );
});

ClientServiceDetailDialog.displayName = 'ClientServiceRecordDialog';

export default ClientServiceDetailDialog;
