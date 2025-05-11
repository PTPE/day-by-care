'use client';

import { Label } from '@/ui/label/label';
import { useGetUser } from '@/features/auth/hooks/useAuthQueries.client';

import Name from './_name';

export default function AccountInformation() {
  const { data: user } = useGetUser();

  return (
    <div className="border border-line p-5 rounded-lg bg-card space-y-5">
      <div className="text-lg font-bold flex items-center gap-2">
        <span className="icon-[material-symbols--account-circle-full] text-accent" />
        <span>帳號管理</span>
      </div>

      <Name />

      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <div className="flex items-center justify-between font-bold gap-2">
          <div>{user?.email}</div>
        </div>
      </div>
    </div>
  );
}
