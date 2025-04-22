import { forwardRef, useImperativeHandle, useState } from 'react';

import { Dialog, DialogContent, DialogHeader } from '@/ui/dialog';

export type SignUpNotificationDialogRef = {
  open: () => void;
  close: () => void;
};

const SignUpNotificationDialog = forwardRef<SignUpNotificationDialogRef>(
  (_, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex flex-col items-center gap-4 w-fit">
          <div className="icon-[ep--success-filled] w-10 h-10 text-green-500" />
          <DialogHeader className="flex justify-center items-center gap-4 text-2xl font-bold">
            註冊成功
          </DialogHeader>

          <p className="text-lg font-medium">請到您的信箱查看驗證信</p>
        </DialogContent>
      </Dialog>
    );
  }
);

SignUpNotificationDialog.displayName = 'SignUpNotificationDialog';

export default SignUpNotificationDialog;
