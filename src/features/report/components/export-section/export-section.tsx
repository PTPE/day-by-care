'use client';

import { useRef, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import SelectExportClient from '@/components/select-export-client';
import {
  useGetClients,
  useGetSchedules,
  useUploadFileToIbonAndSendNotifyEmail,
} from '@/hooks/query';
import { getMonthRange } from '@/utils/get-month-range';
import { Client } from '@/types/client';
import PreviewSelectedClient from '@/components/preview-selected-client';
import Button from '@/ui/button';
import IbonPrintDialog from '@/components/ibon-print-dialog.tsx';
import { IbonPrintDialogRef } from '@/components/ibon-print-dialog.tsx/ibon-print-dialog';
import downloadPdf from '@/utils/download-pdf';
import pdfToBuffer from '@/utils/pdf-to-buffers';
import LoadingSpinner from '@/ui/loading-spinner';

import ReportPdf from './_report-pdf';

export default function ExportSection() {
  const ibonPrintDialogRef = useRef<IbonPrintDialogRef>(null);
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [pincode, setPincode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const searchParams = useSearchParams();
  const year = Number(searchParams.get('year')) || new Date().getFullYear();
  const month = Number(searchParams.get('month')) || new Date().getMonth() + 1;

  const { startDate, endDate } = getMonthRange(year, month);

  const { data: clients } = useGetClients({
    startDate,
    endDate,
  });

  const { data: schedules } = useGetSchedules({
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

  const handleSelectedClients = (clientId: string) => {
    const newClient = clients?.find((client) => client.clientId === clientId);
    if (!newClient) return;

    setSelectedClients((prev) => {
      if (prev.some((client) => client.clientId === clientId))
        return prev.filter((client) => client.clientId !== clientId);
      return [...prev, newClient];
    });
  };

  function handleDownloadPdf() {
    const downloadPdfId = `report-${year}-${month}`;
    downloadPdf([downloadPdfId], 'p');
  }

  async function handleIbonPrint() {
    const downloadPdfId = `report-${year}-${month}`;
    const buffer = await pdfToBuffer([downloadPdfId]);

    if (!buffer) {
      throw new Error('PDF 生成失敗');
    }

    uploadFileToIbonAndSendNotifyEmail({
      bufferArr: [buffer],
      fileName: `report-${year}-${month}.pdf`,
    });
  }

  return (
    <div className="space-y-5">
      {isUploadingFileToIbon && <LoadingSpinner />}

      <div className="flex items-center gap-2 text-primary text-lg font-bold">
        <span className="icon-[material-symbols--calendar-month-outline]" />
        <span>
          {year}年{month}月
        </span>
      </div>

      <SelectExportClient
        clients={clients || []}
        selectedClients={selectedClients}
        onHandleSelectClient={handleSelectedClients}
      />

      <PreviewSelectedClient selectedSchedules={selectedClientSchedule || []} />

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

      <ReportPdf schedules={selectedClientSchedule} />
    </div>
  );
}
