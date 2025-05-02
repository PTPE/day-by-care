'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { setYear, setMonth } from '@/features/schedule/store/schedule-slice';

export default function ScheduleTimeSelect() {
  const dispatch = useAppDispatch();
  const year = useAppSelector((state) => state.schedule.year);
  const month = useAppSelector((state) => state.schedule.month);

  const yearOptions = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + 1 - i
  );
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex gap-2">
      <Select
        onValueChange={(value) => dispatch(setYear(Number(value)))}
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
        onValueChange={(value) => dispatch(setMonth(Number(value)))}
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
