import { Client, Schedule } from '@/types/client';
import { getMonthRange } from '@/utils/get-month-range';
import fillMissingServiceDates from '@/utils/fill-missing-service-dates';

import FirstHalfSchedulePdf from './_first-half-schedule-pdf';
import SecondHalfSchedulePdf from './_second-half-schedule-pdf';

type Props = {
  year: number;
  month: number;
  selectedClientSchedule: Schedule[];
  selectedClients: Client[];
};

export default function DownloadPdf({
  year,
  month,
  selectedClientSchedule,
  selectedClients,
}: Props) {
  if (!selectedClients.length || !selectedClientSchedule.length) return null;

  const { startDate, endDate } = getMonthRange(year, month);

  return (
    <div>
      {selectedClientSchedule.map((schedule, i) => {
        const filledServiceTime = fillMissingServiceDates(
          startDate,
          endDate,
          schedule.serviceTime
        );
        const firstHalfMonthSchedule = filledServiceTime.filter((item) => {
          const day = new Date(item.date).getDate();
          return day >= 1 && day <= 15;
        });

        const secondHalfMonthSchedule = filledServiceTime.filter((item) => {
          const day = new Date(item.date).getDate();
          return day >= 16;
        });

        return (
          <>
            <FirstHalfSchedulePdf
              year={year}
              month={month}
              client={selectedClients[i]}
              serviceTime={firstHalfMonthSchedule}
            />

            <SecondHalfSchedulePdf
              client={selectedClients[i]}
              serviceTime={secondHalfMonthSchedule}
            />
          </>
        );
      })}
    </div>
  );
}
