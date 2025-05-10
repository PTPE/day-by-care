'use client';

import Button from '@/ui/button';
import { useSignOut } from '@/features/auth/hooks/useAuthQueries.client';

export default function Logout() {
  const { mutate: signOut } = useSignOut();

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="h-[1px] bg-line w-full" />
      <Button
        variant="outline"
        className="w-full border-destructive text-destructive hover:bg-destructive/20"
        onClick={() => signOut()}
      >
        <span className="icon-[mage--logout]" />
        <span>登出</span>
      </Button>
    </div>
  );
}
