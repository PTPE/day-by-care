import { forwardRef, useImperativeHandle, useState } from 'react';

import { format } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import Button from '@/ui/button';

import TimeSlot from './_time-slot';

type Props = {
  date: Date;
};

export type CheckInOutDialogRef = {
  open: () => void;
  close: () => void;
};

const CheckInOutDialog = forwardRef<CheckInOutDialogRef, Props>(
  ({ date }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-primary w-[95%] rounded-md">
          <DialogDescription />

          <DialogHeader>
            <DialogTitle>{format(date, 'yyyy年MM月dd日')}排程</DialogTitle>
          </DialogHeader>
          <div>
            <TimeSlot />
          </div>

          <Button variant="outline" className="text-accent">
            新增時段
          </Button>

          <div className="w-full h-[1px] bg-line" />

          <div className="flex justify-between">
            <Button variant="ghost" className="text-destructive">
              刪除全部時段
            </Button>

            <Button variant="ghost">取消變更</Button>

            <Button variant="accent">儲存變更</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

CheckInOutDialog.displayName = 'CheckInOutDialog';

export default CheckInOutDialog;
