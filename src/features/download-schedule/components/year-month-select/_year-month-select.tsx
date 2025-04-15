'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

type Props = {
  yearOptions: number[];
  monthOptions: number[];
  onHandleSelectedYear: (year: number) => void;
  onHandleSelectedMonth: (month: number) => void;
};

export default function YearMonthSelect({
  yearOptions,
  monthOptions,
  onHandleSelectedYear,
  onHandleSelectedMonth,
}: Props) {
  return (
    <div className="flex gap-5">
      <Select onValueChange={(e) => onHandleSelectedYear(+e)}>
        <SelectTrigger>
          <SelectValue placeholder="請選擇年份" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={`${year}`}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(e) => onHandleSelectedMonth(+e)}>
        <SelectTrigger>
          <SelectValue placeholder="請選擇月份" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {monthOptions.map((month) => (
              <SelectItem key={month} value={`${month}`}>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
