'use client';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import PreviewSelectedClient from '@/components/preview-selected-client';
import SelectExportClient from '@/components/select-export-client';
import ScheduleTimeSelect from '@/features/schedule/components/schedule-time-select';
import Button from '@/ui/button';
import { useGetClients, useGetSchedules } from '@/hooks/query';
import { getMonthRange } from '@/utils/get-month-range';
import { Client } from '@/types/client';
import downloadPdf from '@/utils/download-pdf';

import DownloadPdf from './_download-pdf';

export default function ExportSection() {
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);

  const searchParams = useSearchParams();
  const month = Number(searchParams.get('month')) || new Date().getMonth() + 1;
  const year = Number(searchParams.get('year')) || new Date().getFullYear();

  const { startDate, endDate } = getMonthRange(year, month);

  const { data: schedules } = useGetSchedules({
    startDate,
    endDate,
  });

  const { data: clients } = useGetClients({
    startDate,
    endDate,
  });

  const selectedClientSchedule = schedules?.filter((schedule) => {
    const selectedClientIds = selectedClients.map((client) => client.clientId);
    return selectedClientIds.includes(schedule.clientId);
  });

  const handleSelectClientId = (clientId: string) => {
    const selectedClient = clients?.find(
      (client) => client.clientId === clientId
    );
    if (!selectedClient) return;
    setSelectedClients((prev) => {
      if (prev.find((c) => c.clientId === clientId))
        return prev.filter((c) => c.clientId !== clientId);
      return [...prev, selectedClient];
    });
  };

  function handleDownloadPdf() {
    const downloadScheduleIds = selectedClients.flatMap((client) => [
      `first-half-month-${client.clientId}`,
      `second-half-month-${client.clientId}`,
    ]);
    downloadPdf(downloadScheduleIds);
  }

  return (
    <div className="flex flex-col gap-5">
      <ScheduleTimeSelect />

      <div className="flex items-center gap-2 text-primary text-lg font-bold">
        <span className="icon-[material-symbols--calendar-month-outline]" />
        <span>
          {year}年{month}月
        </span>
      </div>

      <SelectExportClient
        selectedClients={selectedClients}
        onHandleSelectClient={handleSelectClientId}
        clients={clients || []}
      />

      <PreviewSelectedClient selectedSchedules={selectedClientSchedule || []} />

      <DownloadPdf
        year={year}
        month={month}
        selectedClientSchedule={selectedClientSchedule || []}
        selectedClients={selectedClients}
      />

      <div className="flex justify-around">
        <Button
          className="text-sm"
          variant="accent"
          onClick={() => handleDownloadPdf()}
        >
          下載PDF
        </Button>

        <Button className="text-sm">至iBon列印</Button>
      </div>
    </div>
  );
}
