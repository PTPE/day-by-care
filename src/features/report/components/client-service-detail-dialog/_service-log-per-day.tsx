import { useRef } from 'react';

import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

import Button from '@/ui/button';
import EditTimeSlotDialog, {
  EditTimeSlotDialogRef,
} from '@/features/report/components/edit-time-slot-dialog';
import { ServiceLog } from '@/features/report/types';

import TimeSlot from './_time-slot';

type Props = {
  serviceLog: ServiceLog;
};

export default function ServiceLogPerDay({ serviceLog }: Props) {
  const editTimeSlotDialogRef = useRef<EditTimeSlotDialogRef>(null);

  return (
    <div className="bg-card rounded-lg p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          {format(serviceLog.date, 'yyyy/M/d（eeeee）', { locale: zhTW })}
        </div>
        <div className="text-accent">{serviceLog.serviceTotalHours}小時</div>
      </div>

      {serviceLog.serviceTime.map((serviceTime) => (
        <TimeSlot
          key={serviceTime.startTime}
          startTime={serviceTime.startTime}
          endTime={serviceTime.endTime}
        />
      ))}

      <Button
        variant="outline"
        className="border-primary text-primary ml-auto"
        onClick={() => editTimeSlotDialogRef.current?.open()}
      >
        編輯時程
      </Button>

      <EditTimeSlotDialog ref={editTimeSlotDialogRef} serviceLog={serviceLog} />
    </div>
  );
}
