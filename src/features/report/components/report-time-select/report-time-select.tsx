'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

export default function ReportTimeSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const month = searchParams.get('month') || new Date().getMonth() + 1;
  const year = searchParams.get('year') || new Date().getFullYear();

  const yearOptions = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + 1 - i
  );
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex gap-2">
      <Select
        onValueChange={(value) =>
          router.push(`${pathname}?year=${value}&month=${month}`)
        }
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
        onValueChange={(value) =>
          router.push(`${pathname}?year=${year}&month=${value}`)
        }
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
