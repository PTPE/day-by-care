'use client';

import { useTransition } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import LoadingSpinner from '@/ui/loading-spinner';

export default function ScheduleTimeSelect() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const now = new Date();
  const month = Number(searchParams.get('month')) || now.getMonth() + 1;
  const year = Number(searchParams.get('year')) || now.getFullYear();

  const yearOptions = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + 1 - i
  );

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  const updateSearchParams = (newParams: { year?: string; month?: string }) => {
    const params = new URLSearchParams(searchParams);

    if (newParams.year) params.set('year', newParams.year);
    if (newParams.month) params.set('month', newParams.month);

    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  return (
    <div className="flex gap-2">
      {isPending && <LoadingSpinner />}
      <Select
        onValueChange={(value) => updateSearchParams({ year: value })}
        value={year.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="選擇年" />
        </SelectTrigger>
        <SelectContent>
          {yearOptions.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}年
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => updateSearchParams({ month: value })}
        value={month.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="選擇月" />
        </SelectTrigger>
        <SelectContent>
          {monthOptions.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}月
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
