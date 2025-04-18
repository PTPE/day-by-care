import { forwardRef, useImperativeHandle, useEffect, useState } from 'react';

import useGetClientsMonthluSchedule from '@/features/download-schedule/hooks/useGetClientsMonthlySchedule';
import ScheduleTemplate from '@/features/download-schedule/components/schedule-template';
import Button from '@/ui/button';
import downloadPdf from '@/features/download-schedule/utils/download-pdf';

type Props = {
  selectedSchedules: string[];
};

type DownloadPdfRef = {
  handleDownloadPdf: () => void;
};

const DownloadPdf = forwardRef<DownloadPdfRef, Props>(
  ({ selectedSchedules }, ref) => {
    const [shouldDownload, setShouldDownload] = useState(false);
    const { data: schedules, refetch } = useGetClientsMonthluSchedule({
      scheduleIds: selectedSchedules,
      enabled: false,
    });

    const handleDownloadPdf = async () => {
      setShouldDownload(true);
      await refetch();
    };

    useEffect(() => {
      if (shouldDownload && schedules && schedules.length > 0) {
        const downloadScheduleIds = selectedSchedules.flatMap((scheduleId) => [
          `first-half-month-${scheduleId}`,
          `second-half-month-${scheduleId}`,
        ]);

        if (downloadScheduleIds.length > 0) {
          downloadPdf(downloadScheduleIds);
          setShouldDownload(false);
        }
      }
    }, [schedules, shouldDownload, selectedSchedules]);

    useImperativeHandle(ref, () => ({
      handleDownloadPdf,
    }));

    return (
      <div>
        <Button
          onClick={handleDownloadPdf}
          disabled={selectedSchedules.length === 0}
        >
          下載pdf
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
);

DownloadPdf.displayName = 'DownloadPdf';

export default DownloadPdf;
