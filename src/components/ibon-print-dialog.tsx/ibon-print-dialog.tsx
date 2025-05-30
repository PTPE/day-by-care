'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';

type IbonPrintDialogRef = {
  open: () => void;
  close: () => void;
};

const IbonPrintDialog = forwardRef<IbonPrintDialogRef>((_, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>iBon列印代碼</DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <div></div>
      </DialogContent>
    </Dialog>
  );
});

IbonPrintDialog.displayName = 'IbonPrintDialog';

export default IbonPrintDialog;
