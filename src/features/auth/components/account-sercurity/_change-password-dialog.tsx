'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Label } from '@/ui/label/label';
import Input from '@/ui/input';
import Button from '@/ui/button';
import { changePasswordSchema } from '@/features/auth/modules/change-password';
import { useUpdateUserPassword } from '@/features/auth/hooks/useAuthQueries.client';

export type ChangePasswordDialogRef = {
  open: () => void;
  close: () => void;
};

const ChangePasswordDialog = forwardRef<ChangePasswordDialogRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate: updateUserPassword } = useUpdateUserPassword();

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const onSubmit = (data: z.infer<typeof changePasswordSchema>) => {
    updateUserPassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[95%] rounded-lg">
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle>變更密碼</DialogTitle>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label>舊密碼</Label>
            <Input type="password" {...register('currentPassword')} />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>新密碼</Label>
            <Input type="password" {...register('newPassword')} />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>確認新密碼</Label>
            <Input type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button variant="accent" className="w-full" type="submit">
            變更新密碼
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default ChangePasswordDialog;
