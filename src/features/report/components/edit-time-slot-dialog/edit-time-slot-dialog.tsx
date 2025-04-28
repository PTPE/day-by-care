import { forwardRef, useImperativeHandle, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/ui/dialog';
import Button from '@/ui/button';

import TimeSlot from './_time-slot';
import EditTimeSlot from './_edit-time-slot';

export type EditTimeSlotDialogRef = {
  open: () => void;
  close: () => void;
};

const EditTimeSlotDialog = forwardRef<EditTimeSlotDialogRef>((_, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogDescription />
      <DialogContent className="w-[95%] rounded-lg max-h-[90%] overflow-y-auto">
        <DialogTitle className="text-primary font-bold text-lg text-start">
          秋津田-2025年4月1日（三）
        </DialogTitle>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <TimeSlot />
            <TimeSlot />
          </div>

          <EditTimeSlot />

          <div className="flex justify-between">
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/20"
            >
              刪除全部
            </Button>
            <Button variant="accent" className="text-primary-foreground">
              新增時段
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button>確認更改</Button>
            <Button variant="ghost" className="border border-border">
              取消
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default EditTimeSlotDialog;
