import { useEffect } from 'react';

import { z } from 'zod';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import Button from '@/ui/button';
import { createScheduleFormSchema } from '@/features/schedule/models/create-schedule-form-schema';

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

  const { setValue, watch } =
    useFormContext<z.infer<typeof createScheduleFormSchema>>();

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

  const selectedTime =
    watch(`schedules.${clientIndex}.timeSlots.${dayIndex}.workTime`)
      ?.filter(
        ({ start, end }) =>
          end.hour * 60 + end.minute > start.hour * 60 + start.minute
      )
      .map(
        ({ start, end }) =>
          `${start.hour.toString().padStart(2, '0')}:${start.minute.toString().padStart(2, '0')} - ${end.hour.toString().padStart(2, '0')}:${end.minute.toString().padStart(2, '0')}`
      ) || [];

  return (
    <Dialog>
      <DialogTrigger className="h-full">
        <div className="rounded bg-secondary p-2 shadow-md h-full hover:bg-accent-button/20 cursor-pointer flex flex-col justify-center items-center border-2 border-accent/30">
          {selectedTime.length > 0 ? (
            selectedTime.map((time, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={index} className="text-accent font-extrabold text-sm">
                {time}
              </span>
            ))
          ) : (
            <span className="icon-[material-symbols--add-2-rounded] text-accent font-extrabold text-3xl" />
          )}
        </div>
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
