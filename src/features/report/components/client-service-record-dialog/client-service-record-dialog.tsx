import { forwardRef, useImperativeHandle, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/ui/dialog';

import DayRecord from './_day-record';

export type ClientServiceRecordDialogRef = {
  open: () => void;
  close: () => void;
};

const ClientServiceRecordDialog = forwardRef<ClientServiceRecordDialogRef>(
  (_, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogDescription />
        <DialogContent className="w-[95%] rounded-lg">
          <DialogHeader className="text-primary font-bold text-lg">
            秋津田-2025年4月
          </DialogHeader>
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">服務記錄</div>
            <div className="bg-accent text-primary-foreground rounded-lg px-2 py-1">
              總時數：100小時
            </div>
          </div>

          <DayRecord />
        </DialogContent>
      </Dialog>
    );
  }
);

ClientServiceRecordDialog.displayName = 'ClientServiceRecordDialog';

export default ClientServiceRecordDialog;
