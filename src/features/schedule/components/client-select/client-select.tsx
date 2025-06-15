'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { useGetClients } from '@/hooks/query';

export default function ClientSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const clientId = searchParams.get('clientId') || '';
  const year = searchParams.get('year') || new Date().getFullYear();
  const month = searchParams.get('month') || new Date().getMonth() + 1;

  const { data: clients } = useGetClients({});

  return (
    <Select
      onValueChange={(value) => {
        router.push(
          `${pathname}?clientId=${value}&year=${year}&month=${month}`
        );
      }}
      value={clientId}
    >
      <SelectTrigger>
        <SelectValue placeholder="選擇案主" />
      </SelectTrigger>
      <SelectContent>
        {clients?.map((client) => (
          <SelectItem key={client.clientId} value={client.clientId}>
            {client.clientName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
