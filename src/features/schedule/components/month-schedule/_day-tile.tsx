import { useRef } from 'react';

import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

import { useGetSchedule } from '@/features/schedule/hooks/useScheduleQuery.client';

import CheckInOutDialog, { CheckInOutDialogRef } from './_check-in-out-dialog';

type Props = {
  date: Date;
};

export default function DayTile({ date }: Props) {
  const checkInOutDialogRef = useRef<CheckInOutDialogRef>(null);

  const searchParams = useSearchParams();
  const clientId = searchParams.get('clientId') || '';
  const year = searchParams.get('year') || new Date().getFullYear();
  const month = searchParams.get('month') || new Date().getMonth() + 1;

  const { data: schedule } = useGetSchedule({
    clientId,
    year: Number(year),
    month: Number(month),
  });

  const thisDayServiceTime =
    schedule
      ?.filter((s) => s.date === format(date, 'yyyy-MM-dd'))
      .map((s) => ({
        start: s.service_start_time || '',
        end: s.service_end_time || '',
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
