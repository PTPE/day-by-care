'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Label } from '@/ui/label/label';
import Input from '@/ui/input';
import Button from '@/ui/button';

export type ChangePasswordDialogRef = {
  open: () => void;
  close: () => void;
};

const ChangePasswordDialog = forwardRef<ChangePasswordDialogRef>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-[95%] rounded-lg">
          <DialogDescription></DialogDescription>
          <DialogHeader>
            <DialogTitle>變更密碼</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label>舊密碼</Label>
              <Input type="password" />
            </div>

            <div className="space-y-2">
              <Label>新密碼</Label>
              <Input type="password" />
            </div>

            <div className="space-y-2">
              <Label>確認新密碼</Label>
              <Input type="password" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="accent">變更新密碼</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

export default ChangePasswordDialog;
