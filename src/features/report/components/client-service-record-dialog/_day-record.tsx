import { useRef } from 'react';

import Button from '@/ui/button';
import EditTimeSlotDialog, {
  EditTimeSlotDialogRef,
} from '@/features/report/components/edit-time-slot-dialog';

import TimeSlot from './_time-slot';

export default function DayRecord() {
  const editTimeSlotDialogRef = useRef<EditTimeSlotDialogRef>(null);

  return (
    <div className="bg-card rounded-lg p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>2025/4/1（一）</div>
        <div className="text-accent">5.5小時</div>
      </div>

      <div className="flex flex-col gap-2">
        <TimeSlot />
        <TimeSlot />
        <TimeSlot />
        <TimeSlot />
      </div>

      <Button
        variant="outline"
        className="border-primary text-primary ml-auto"
        onClick={() => editTimeSlotDialogRef.current?.open()}
      >
        編輯時程
      </Button>

      <EditTimeSlotDialog ref={editTimeSlotDialogRef} />
    </div>
  );
}
