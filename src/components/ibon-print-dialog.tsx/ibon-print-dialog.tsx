'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import Button from '@/ui/button';

type Props = {
  expiryDate: string;
  pincode: string;
};

export type IbonPrintDialogRef = {
  open: () => void;
  close: () => void;
};

const IbonPrintDialog = forwardRef<IbonPrintDialogRef, Props>(
  ({ expiryDate, pincode }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90%] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              iBon列印代碼
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="hidden" />

          <div className="flex flex-col gap-5 items-center">
            <div className="text-primary font-bold text-5xl">{pincode}</div>

            <div className="text-muted-foreground text-center">
              <br /> 請於 {expiryDate} 前，
              <br />
              至全台 7-ELEVEN 的 iBon 機台輸入代碼，
              <br />
              即可列印排班表。
            </div>
          </div>

          <Button variant="accent" onClick={() => setOpen(false)}>
            我知道了
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
);

IbonPrintDialog.displayName = 'IbonPrintDialog';

export default IbonPrintDialog;
