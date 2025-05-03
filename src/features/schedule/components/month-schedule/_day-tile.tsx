import { useRef } from 'react';

import { useAppSelector } from '@/store/hooks';

import CheckInOutDialog, { CheckInOutDialogRef } from './_check-in-out-dialog';

type Props = {
  date: Date;
};

export default function DayTile({ date }: Props) {
  const checkInOutDialogRef = useRef<CheckInOutDialogRef>(null);

  const thisDayServiceTime =
    useAppSelector((state) =>
      state.schedule.monthSchedule.find(
        (schedule) => schedule.date === date.toISOString()
      )
    )?.serviceTime || [];

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
