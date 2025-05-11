'use client';

import { useRef } from 'react';

import Button from '@/ui/button';

import ChangePasswordDialog, {
  ChangePasswordDialogRef,
} from './_change-password-dialog';

export default function AccountSecurity() {
  const changePasswordDialogRef = useRef<ChangePasswordDialogRef>(null);

  return (
    <div className="border border-line p-5 rounded-lg bg-card space-y-5">
      <div className="text-lg font-bold flex items-center gap-2">
        <span className="icon-[mage--key] text-accent" />
        <span>帳號安全</span>
      </div>

      <Button
        variant="secondary"
        className="w-full justify-start"
        onClick={() => changePasswordDialogRef.current?.open()}
      >
        <span className="icon-[mage--key]" />
        <span>變更密碼</span>
      </Button>

      <ChangePasswordDialog ref={changePasswordDialogRef} />
    </div>
  );
}
