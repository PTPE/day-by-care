'use client';

import { useState } from 'react';

import useGetAvailableYearMonthSchedule from '@/features/download-schedule/hooks/useGetAvailableYearMonthSchedule';
import YearMonthSelect from '@/features/download-schedule/components/year-month-select';
import ClientItem from '@/features/download-schedule/components/client-item';
import Button from '@/ui/button';

export default function Page() {
  const [monthOptions, setMonthOptions] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);

  const { data: availebleSchedules } = useGetAvailableYearMonthSchedule();

  if (!availebleSchedules) return null;

  const yearOptions = Array.from(
    new Set(
      availebleSchedules
        .map((schedule) => schedule.schedule.map((s) => s.year).flat())
        .flat()
    )
  );

  const handleSelectedYear = (year: number) => {
    setSelectedYear(year);
    const months = Array.from(
      new Set(
        availebleSchedules
          .map((schedule) => schedule.schedule.filter((s) => s.year === +year))
          .flat()
          .map((schedule) => schedule.month)
      )
    );

    setMonthOptions(months);
    setSelectedSchedules([]);
  };

  const handleSelectedMonth = (month: number) => {
    setSelectedMonth(month);
    setSelectedSchedules([]);
  };

  const handleSelectedSchedule = (scheduleId: string) => {
    setSelectedSchedules((prev) => {
      if (prev.includes(scheduleId))
        return prev.filter((id) => id !== scheduleId);

      return [...prev, scheduleId];
    });
  };

  const availableClients = availebleSchedules
    .map((schedule) => {
      const matched = schedule.schedule.find(
        (s) => s.year === selectedYear && s.month === selectedMonth
      );

      if (!matched) return null;

      return {
        clientId: schedule.client_id,
        clientName: schedule.clientName,
        clientIcon: schedule.clientIcon,
        scheduleId: matched.schedule_id,
      };
    })
    .filter((client): client is NonNullable<typeof client> => client !== null);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-extrabold">下載班表</h1>

      <YearMonthSelect
        yearOptions={yearOptions}
        monthOptions={monthOptions}
        onHandleSelectedYear={handleSelectedYear}
        onHandleSelectedMonth={handleSelectedMonth}
      />

      <div className="space-x-5">
        <Button disabled={!selectedSchedules.length}>預覽班表</Button>
        <Button disabled={!selectedSchedules.length}>下載pdf</Button>
        <Button disabled={!selectedSchedules.length}>至ibon列印</Button>
      </div>

      <div className="flex gap-5">
        {availableClients.map((client) => (
          <ClientItem
            key={client.clientId}
            clientIcon={client.clientIcon}
            clientName={client.clientName}
            scheduleId={client.scheduleId}
            onHandleSelectedSchedule={handleSelectedSchedule}
            selectedSchedules={selectedSchedules}
          />
        ))}
      </div>

      <div></div>
    </div>
  );
}
