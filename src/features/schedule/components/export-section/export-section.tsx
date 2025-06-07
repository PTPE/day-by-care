'use client';

import { useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import PreviewSelectedClient from '@/components/preview-selected-client';
import SelectExportClient from '@/components/select-export-client';
import ScheduleTimeSelect from '@/features/schedule/components/schedule-time-select';
import Button from '@/ui/button';
import {
  useGetClients,
  useGetSchedules,
  useUploadFileToIbonAndSendNotifyEmail,
} from '@/hooks/query';
import { getMonthRange } from '@/utils/get-month-range';
import { Client } from '@/types/client';
import downloadPdf from '@/utils/download-pdf';
import pdfToBuffer from '@/utils/pdf-to-buffers';
import IbonPrintDialog from '@/components/ibon-print-dialog.tsx';
import { IbonPrintDialogRef } from '@/components/ibon-print-dialog.tsx/ibon-print-dialog';
import LoadingSpinner from '@/ui/loading-spinner';

import DownloadPdf from './_download-pdf';

export default function ExportSection() {
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [pincode, setPincode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const ibonPrintDialogRef = useRef<IbonPrintDialogRef>(null);

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

  const {
    mutate: uploadFileToIbonAndSendNotifyEmail,
    isPending: isUploadingFileToIbon,
  } = useUploadFileToIbonAndSendNotifyEmail({
    onSuccessCb: (data) => {
      setPincode(data.pincode);
      setExpiryDate(data.deadline);
      ibonPrintDialogRef.current?.open();
    },
  });

  const selectedClientSchedule =
    schedules?.filter((schedule) => {
      const selectedClientIds = selectedClients.map(
        (client) => client.clientId
      );
      return selectedClientIds.includes(schedule.clientId);
    }) || [];

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

  async function handleIbonPrint() {
    const downloadScheduleIds = selectedClients.map((client) => [
      `first-half-month-${client.clientId}`,
      `second-half-month-${client.clientId}`,
    ]);

    const buffers = await Promise.all(
      downloadScheduleIds.map(async (scheduleId) => {
        const buffer = await pdfToBuffer(scheduleId);
        if (!buffer) {
          throw new Error('PDF 生成失敗');
        }
        return buffer;
      })
    );

    uploadFileToIbonAndSendNotifyEmail({
      bufferArr: buffers,
      fileName: 'schedule.pdf',
    });
  }

  return (
    <div className="flex flex-col gap-5">
      {isUploadingFileToIbon && <LoadingSpinner />}
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
          disabled={selectedClientSchedule?.length === 0}
        >
          下載PDF
        </Button>

        <Button
          disabled={selectedClientSchedule?.length === 0}
          className="text-sm"
          onClick={() => handleIbonPrint()}
        >
          至iBon列印
        </Button>

        <IbonPrintDialog
          ref={ibonPrintDialogRef}
          pincode={pincode}
          expiryDate={expiryDate}
        />
      </div>
    </div>
  );
}
