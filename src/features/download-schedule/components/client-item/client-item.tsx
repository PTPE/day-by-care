import { useState } from 'react';

import Checkbox from '@/ui/checkbox';

type Props = {
  clientName: string;
  clientIcon: string;
  scheduleId: string;
  onHandleSelectedSchedule: (scheduleId: string) => void;
  selectedSchedules: string[];
};

export default function ClientItem({
  clientName,
  clientIcon,
  scheduleId,
  onHandleSelectedSchedule,
  selectedSchedules,
}: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={`flex flex-col items-center ${checked ? 'bg-secondary ' : 'bg-secondary'} px-10 py-5 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] rounded-md`}
    >
      <div className="w-20 h-20 p-3 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] rounded-full bg-secondary">
        <span className={`${clientIcon} w-full h-full`} />
      </div>
      <div className="font-semibold">{clientName}</div>
      <Checkbox
        className={`mt-5 ${checked ? 'text-accent' : 'text-accent'}`}
        onCheckedChange={(e) => {
          setChecked(e as boolean);
          onHandleSelectedSchedule(scheduleId);
        }}
        checked={selectedSchedules.includes(scheduleId)}
      />
    </div>
  );
}
