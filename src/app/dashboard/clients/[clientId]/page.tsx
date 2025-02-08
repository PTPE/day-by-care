'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import ClientOverview from '@/features/client/components/client-overview';
import ClientForm from '@/features/client/components/client-form';
import useGetClient from '@/features/client/hooks/useGetClient';

export default function ClientPage() {
  const [isEdit, setIsEdit] = useState(false);

  const { clientId } = useParams<{ clientId: string }>();

  const { data: client } = useGetClient(clientId);

  const handleExitEditMode = () => setIsEdit(false);

  if (!client) return null;

  return (
    <div className="relative flex flex-col gap-5 items-center">
      <button
        className="absolute top-0 right-1/2 z-10 translate-x-[115px] icon-[material-symbols--edit-square-outline-rounded] text-2xl cursor-pointer"
        onClick={() => setIsEdit(true)}
        type="button"
      />
      {isEdit ? (
        <ClientForm onHandleExitEditModet={handleExitEditMode} />
      ) : (
        <ClientOverview />
      )}
    </div>
  );
}
