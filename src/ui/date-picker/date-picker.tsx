'use client';

import * as React from 'react';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';

import Button from '@/ui/button';
import Calendar from '@/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

type Props = {
  startYear?: number;
  endYear?: number;
  onChange?: (date: Date) => void;
  value?: Date;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function DatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  onChange,
  value,
}: Props) {
  const [date, setDate] = React.useState<Date>(value || new Date());

  const handleMonthChange = (month: string) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(date, parseInt(year, 10));
    setDate(newDate);
  };

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData) {
      setDate(selectedData);
      onChange?.(selectedData);
    }
  };

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(date)]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={getYear(date).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          selected={date}
          mode="single"
          onSelect={handleSelect}
          initialFocus
          month={date}
          onMonthChange={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
