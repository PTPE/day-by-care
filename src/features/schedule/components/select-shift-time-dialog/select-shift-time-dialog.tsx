import { useEffect } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import CalendarCell from '@/features/schedule/components/calendar-cell';
import Button from '@/ui/button';

import ShiftTimeItem from './_shift-time-item';

type Props = {
  clientIndex: number;
  dayIndex: number;
  day: number;
};

export default function SelectShiftTimeDialog({
  clientIndex,
  dayIndex,
  day,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    name: `schedules.${clientIndex}.timeSlots.${dayIndex}.workTime`,
  });

  const { setValue } = useFormContext();

  useEffect(() => {
    setValue(`schedules.${clientIndex}.timeSlots.${dayIndex}.day`, day);
  }, [setValue, day, clientIndex, dayIndex]);

  useEffect(() => {
    if (fields.length === 0) {
      setValue(`schedules.${clientIndex}.timeSlots.${dayIndex}.workTime`, [
        { start: { hour: 0, minute: 0 }, end: { hour: 0, minute: 0 } },
      ]);
    }
  }, [fields, setValue, clientIndex, dayIndex]);

  return (
    <Dialog>
      <DialogTrigger className="h-full">
        <CalendarCell className="hover:bg-accent-button/20 cursor-pointer flex justify-center items-center border-2 border-accent/30">
          <span className="icon-[material-symbols--add-2-rounded] text-accent font-extrabold text-3xl" />
        </CalendarCell>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">請選擇時間</DialogTitle>

          <DialogDescription />

          {fields.map((f, index) => (
            <div className="flex gap-5" key={f.id}>
              <ShiftTimeItem
                key={f.id}
                clientIndex={clientIndex}
                index={index}
                dayIndex={dayIndex}
              />
              <Button variant="destructive" onClick={() => remove(index)}>
                x
              </Button>
            </div>
          ))}
        </DialogHeader>

        <Button
          variant="outline"
          onClick={() =>
            append({
              start: { hour: 0, minute: 0 },
              end: { hour: 0, minute: 0 },
            })
          }
        >
          ＋
        </Button>
      </DialogContent>
    </Dialog>
  );
}
