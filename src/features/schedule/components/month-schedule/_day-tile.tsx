import { useRef } from 'react';

import CheckInOutDialog, { CheckInOutDialogRef } from './_check-in-out-dialog';

type Props = {
  date: Date;
};

export default function DayTile({ date }: Props) {
  const checkInOutDialogRef = useRef<CheckInOutDialogRef>(null);
  const isSelectedDate =
    date.toLocaleDateString('en-US', {
      day: 'numeric',
    }) ===
    new Date().toLocaleDateString('en-US', {
      day: 'numeric',
    });

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
      <div className="flex flex-col gap-1">
        {isSelectedDate && (
          <div className="space-y-2">
            <div className="flex flex-wrap bg-tertiary text-xs p-1 rounded-sm">
              17:00-19:00
            </div>
            <div className="flex flex-wrap bg-tertiary text-xs p-1 rounded-sm">
              17:00-19:00
            </div>
            <div className="flex flex-wrap bg-tertiary text-xs p-1 rounded-sm">
              17:00-19:00
            </div>
          </div>
        )}

        <CheckInOutDialog ref={checkInOutDialogRef} date={date} />
      </div>
    </>
  );
}
