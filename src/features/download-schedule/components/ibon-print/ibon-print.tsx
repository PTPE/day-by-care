'use client';

import { useEffect, useState } from 'react';

import Button from '@/ui/button';
import ScheduleTemplate from '@/features/download-schedule/components/schedule-template';
import useGetClientsMonthluSchedule from '@/features/download-schedule/hooks/useGetClientsMonthlySchedule';
import pdfToBuffer from '@/features/download-schedule/utils/pdf-to-buffer';
import useUploadFileToIbonAndSendNotifyEmail from '@/features/download-schedule/hooks/useUploadFileToIbonAndSendNotifyEmail';

import UploadFileNotificationDialog from './_upload-file-notification-dialog';

type Props = {
  selectedSchedules: string[];
};

export default function IbonPrint({ selectedSchedules }: Props) {
  const [shouldDownload, setShouldDownload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pincode, setPincode] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [
    openUploadFileNotificationDialog,
    setOpenUploadFileNotificationDialog,
  ] = useState(false);

  const { data: schedules, refetch } = useGetClientsMonthluSchedule({
    scheduleIds: selectedSchedules,
    enabled: false,
  });

  const { mutate: uploadFileToIbonAndSendNotifyEmail } =
    useUploadFileToIbonAndSendNotifyEmail({
      onSuccessCb: (data) => {
        setPincode(data.pincode);
        setExpirationDate(data.deadline);
        setOpenUploadFileNotificationDialog(true);
      },
    });

  const handleIbonPrint = async () => {
    try {
      setIsLoading(true);
      setShouldDownload(true);
      await refetch();
    } catch (error) {
      throw new Error('獲取班表失敗');
    }
  };

  useEffect(() => {
    (async () => {
      if (!shouldDownload || !schedules?.length) return;

      try {
        const downloadScheduleIds = selectedSchedules.map((scheduleId) => [
          `first-half-month-${scheduleId}`,
          `second-half-month-${scheduleId}`,
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
      } catch (error) {
        throw new Error('列印失敗');
      } finally {
        setIsLoading(false);
        setShouldDownload(false);
      }
    })();
  }, [
    selectedSchedules,
    shouldDownload,
    schedules?.length,
    uploadFileToIbonAndSendNotifyEmail,
  ]);

  return (
    <div>
      <Button
        disabled={selectedSchedules.length === 0 || isLoading}
        onClick={handleIbonPrint}
      >
        {isLoading ? '處理中...' : '至ibon列印'}
      </Button>

      {schedules?.map((schedule) => (
        <ScheduleTemplate
          type="download"
          key={schedule.schedule_id}
          schedule={schedule}
        />
      ))}

      <UploadFileNotificationDialog
        open={openUploadFileNotificationDialog}
        onClose={() => setOpenUploadFileNotificationDialog(false)}
        pincode={pincode}
        expirationDate={expirationDate}
      />
    </div>
  );
}
