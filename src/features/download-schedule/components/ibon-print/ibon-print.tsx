'use client';

import { useEffect, useState } from 'react';

import Button from '@/ui/button';
import ScheduleTemplate from '@/features/download-schedule/components/schedule-template';
import useGetClientsMonthluSchedule from '@/features/download-schedule/hooks/useGetClientsMonthlySchedule';
import pdfToBuffer from '@/features/download-schedule/utils/pdf-to-buffer';
import { uploadFileToIbonAndSendNotifyEmail } from '@/features/download-schedule/actions/get-ibon-tokens';

type Props = {
  selectedSchedules: string[];
};

export default function IbonPrint({ selectedSchedules }: Props) {
  const [shouldDownload, setShouldDownload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: schedules, refetch } = useGetClientsMonthluSchedule({
    scheduleIds: selectedSchedules,
    enabled: false,
  });

  const handleIbonPrint = async () => {
    try {
      setIsLoading(true);
      setShouldDownload(true);
      await refetch();
    } catch (error) {
      throw new Error('獲取班表失敗');
    } finally {
      setIsLoading(false);
      setShouldDownload(false);
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

        await uploadFileToIbonAndSendNotifyEmail({
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
  }, [selectedSchedules, shouldDownload, schedules?.length]);

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
    </div>
  );
}
