import { UseFormRegister } from 'react-hook-form';

import Input from '@/ui/input';

type Props = {
  index: number;
  register: UseFormRegister<{
    serviceTime: {
      startTime: string;
      endTime: string;
    }[];
  }>;
  onRemove: () => void;
};

export default function TimeSlot({ index, register, onRemove }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="w-full gap-2 flex items-center text-base text-primary font-bold">
        <Input
          type="time"
          className="inline-block w-full cursor-pointer flex-1 bg-card text-secondary-foreground"
          {...register(`serviceTime.${index}.startTime`)}
        />
        <Input
          type="time"
          className="inline-block w-full cursor-pointer flex-1 bg-card text-secondary-foreground"
          {...register(`serviceTime.${index}.endTime`)}
        />
      </div>

      <button
        type="button"
        className="aspect-square flex items-center justify-center rounded-md hover:bg-accent cursor-pointer p-2"
        onClick={onRemove}
      >
        <div className="icon-[material-symbols--delete-outline] text-destructive cursor-pointer text-xl" />
      </button>
    </div>
  );
}
