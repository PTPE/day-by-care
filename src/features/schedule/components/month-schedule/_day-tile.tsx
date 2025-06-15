import { useRef } from 'react';

import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

import { getMonthRange } from '@/utils/get-month-range';
import { useGetSchedules } from '@/hooks/query';

import CheckInOutDialog, { CheckInOutDialogRef } from './_check-in-out-dialog';

type Props = {
  date: Date;
};

export default function DayTile({ date }: Props) {
  const checkInOutDialogRef = useRef<CheckInOutDialogRef>(null);

  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId') || '';
  const year = Number(searchParams.get('year')) || new Date().getFullYear();
  const month = Number(searchParams.get('month')) || new Date().getMonth() + 1;

  const { startDate, endDate } = getMonthRange(year, month);

  const { data: schedule } = useGetSchedules({
    clientIds: [clientId],
    startDate,
    endDate,
  });

  const thisDayServiceTime =
    schedule?.[0].serviceTime
      .filter((s) => s.date === format(date, 'yyyy-MM-dd'))
      .map((s) => ({
        start: s.start || '',
        end: s.end || '',
      })) || [];

  return (
    <>
      <div
        className="absolute w-full h-full top-0 left-0"
        onClick={() => checkInOutDialogRef.current?.open()}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            checkInOutDialogRef.current?.open();
          }
        }}
        role="button"
        tabIndex={0}
      />
      <div className="space-y-2">
        {thisDayServiceTime.map(
          (time) =>
            time.start &&
            time.end && (
              <div
                className="flex flex-wrap bg-accent/30 text-xs p-1 rounded-sm break-normal"
                key={`${time.start}-${time.end}`}
              >
                <span>{time.start}</span>
                <span>-</span>
                <span>{time.end}</span>
              </div>
            )
        )}
      </div>

      <CheckInOutDialog
        ref={checkInOutDialogRef}
        date={date}
        serviceTime={thisDayServiceTime}
      />
    </>
  );
}
