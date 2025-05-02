import { useFormContext } from 'react-hook-form';

import Input from '@/ui/input';

type Props = {
  fieldName: string;
  onRemove: () => void;
};

export default function ServiceTimeItem({ fieldName, onRemove }: Props) {
  const { register } = useFormContext();

  return (
    <div className="flex gap-2 flex-col items-center bg-secondary rounded-md p-2 border border-line">
      <div className="text-sm self-start flex items-center justify-between w-full">
        <div>開始</div>
        <button
          type="button"
          className="icon-[solar--trash-bin-minimalistic-outline] text-lg text-destructive cursor-pointer"
          onClick={onRemove}
        />
      </div>
      <Input
        type="time"
        {...register(`${fieldName}.start`)}
        className="inline w-[130px]"
      />
      <div className="text-sm self-start">結束</div>
      <Input
        type="time"
        {...register(`${fieldName}.end`)}
        className="inline w-[130px]"
      />
    </div>
  );
}
