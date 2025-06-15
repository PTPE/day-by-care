import { UseFormRegister } from 'react-hook-form';

import Input from '@/ui/input';
import Label from '@/ui/label';
import Button from '@/ui/button';

type Props = {
  index: number;
  onRemove: () => void;
  register: UseFormRegister<{
    serviceTime: {
      startTime: string;
      endTime: string;
    }[];
  }>;
};

export default function TimeSlot({ register, index, onRemove }: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Label className="text-sm md:text-base">簽到</Label>
        <div className="w-full">
          <Input
            type="time"
            className="inline w-full"
            {...register(`serviceTime.${index}.startTime`)}
          />
        </div>
      </div>

      <div className="flex-1">
        <Label className="text-sm md:text-base">簽退</Label>
        <div className="w-full">
          <Input
            type="time"
            className="inline w-full"
            {...register(`serviceTime.${index}.endTime`)}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="destructive"
        className="icon-[solar--trash-bin-minimalistic-outline] mt-8 w-5 h-5 cursor-pointer"
        onClick={onRemove}
      />
    </div>
  );
}
