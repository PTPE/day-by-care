import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import LoadingSpinner from '@/ui/loading-spinner';

type Props = {
  clientName: string;
  clientId: string;
  isSelected: boolean;
};

export default function ClientListItem({
  clientName,
  clientId,
  isSelected,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleClick = () => {
    startTransition(() => {
      router.push(`/dashboard?clientId=${clientId}`);
    });
  };

  return (
    <>
      {isPending && <LoadingSpinner />}
      <button
        type="button"
        onClick={handleClick}
        className={`flex flex-col gap-2 items-center justify-between px-4 py-2 border-b border-gray-200 flex-shrink-0 rounded-full cursor-pointer ${
          isSelected ? 'bg-button-primary' : 'bg-tertiary'
        }`}
      >
        <div
          className={`text-base font-semibold flex-shrink-0 tracking-widest ${
            isSelected ? 'text-primary-foreground' : 'text-black'
          }`}
        >
          {clientName}
        </div>
      </button>
    </>
  );
}
