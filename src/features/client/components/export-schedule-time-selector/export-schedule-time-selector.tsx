'use client';

import { useState } from 'react';

import Button from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientSchedule: {
    schedule_id: string;
    year: number;
    month: number;
  }[];
};

export default function ExportScheduleTimeSelector({
  open,
  onOpenChange,
  clientSchedule,
}: Props) {
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [monthOptions, setMonthOptions] = useState<number[]>([]);

  const handleYearChange = (selectedYear: number) => {
    setYear(selectedYear);
    const months = clientSchedule
      .filter((schedule) => schedule.year === selectedYear)
      .map((schedule) => schedule.month);

    setMonthOptions(Array.from(new Set(months)));
  };

  const yearOptions = Array.from(
    new Set(clientSchedule.map((schedule) => schedule.year))
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectedScheduleId = clientSchedule.find(
    (schedule) => schedule.year === year && schedule.month === month
  )?.schedule_id;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[200px]">
        <DialogHeader>
          <DialogDescription className="hidden">製作班表</DialogDescription>
        </DialogHeader>

        <div>
          <DialogTitle>選擇時間</DialogTitle>

          <div className="flex flex-col gap-5">
            <Select onValueChange={(e) => handleYearChange(+e)}>
              <SelectTrigger>
                <SelectValue placeholder="年" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((y) => (
                  <SelectItem key={y} value={`${y}`}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(e) => setMonth(+e)} disabled={!year}>
              <SelectTrigger>
                <SelectValue placeholder="月" />
              </SelectTrigger>

              <SelectContent>
                {monthOptions.map((m) => (
                  <SelectItem key={m} value={`${m}`}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="default">下載</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
