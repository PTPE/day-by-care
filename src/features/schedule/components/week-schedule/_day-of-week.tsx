'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';

import Button from '@/ui/button';
import { DayOfWeek as DayOfWeekType } from '@/features/schedule/types';

import ServiceTimeItem from './_service-time-item';

type Props = {
  day: DayOfWeekType;
};

const getDayLabel = (day: DayOfWeekType): string => {
  const labels: Record<DayOfWeekType, string> = {
    [DayOfWeekType.SUNDAY]: '日',
    [DayOfWeekType.MONDAY]: '一',
    [DayOfWeekType.TUESDAY]: '二',
    [DayOfWeekType.WEDNESDAY]: '三',
    [DayOfWeekType.THURSDAY]: '四',
    [DayOfWeekType.FRIDAY]: '五',
    [DayOfWeekType.SATURDAY]: '六',
  };
  return labels[day];
};

export default function DayOfWeek({ day }: Props) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `${day}`,
  });

  return (
    <div className="flex flex-col items-center min-w-[170px]">
      <div className="font-bold text-base text-center bg-tertiary text-tertiary-foreground rounded-t-md w-full py-2 border border-line">
        星期{getDayLabel(day)}
      </div>
      <div className="bg-card p-4 rounded-b-md w-full flex flex-col gap-2 items-center">
        {fields.map((field, index) => (
          <ServiceTimeItem
            key={field.id}
            fieldName={`${day}.${index}`}
            onRemove={() => remove(index)}
          />
        ))}

        <Button
          type="button"
          variant="secondary"
          className="border border-dashed border-line text-sm"
          onClick={() => {
            append({ start: '', end: '' });
          }}
        >
          ＋ 新增時段
        </Button>
      </div>
    </div>
  );
}
