/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { UseFormRegister } from 'react-hook-form';

import Input from '@/ui/input';

type Props = {
  index: number;
  onRemove: () => void;
  register: UseFormRegister<{
    serviceTime: {
      start: string;
      end: string;
    }[];
  }>;
};

export default function TimeSlot({ index, register, onRemove }: Props) {
  return (
    <div className="border border-line p-4 rounded-md space-y-5">
      <div className="flex items-center gap-2">
        <div className="icon-[material-symbols--nest-clock-farsight-analog-outline]" />
        時段
        <div
          className="icon-[material-symbols--delete-outline] ml-auto bg-destructive cursor-pointer"
          onClick={onRemove}
        />
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="time"
          className="inline w-full text-base h-auto p-2 cursor-pointer"
          {...register(`serviceTime.${index}.start`)}
        />
        <Input
          type="time"
          className="inline w-full text-base h-auto p-2 cursor-pointer"
          {...register(`serviceTime.${index}.end`)}
        />
      </div>
    </div>
  );
}
