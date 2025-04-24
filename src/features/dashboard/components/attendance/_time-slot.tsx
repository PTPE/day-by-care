import Input from '@/ui/input';
import Label from '@/ui/label';

export default function TimeSlot() {
  return (
    <div className="flex gap-5">
      <div className="flex-1">
        <Label className="text-sm md:text-base">簽到</Label>
        <div className="w-full">
          <Input type="time" className="inline w-full" />
        </div>
      </div>

      <div className="flex-1">
        <Label className="text-sm md:text-base">簽退</Label>
        <div className="w-full">
          <Input type="time" className="inline w-full" />
        </div>
      </div>
    </div>
  );
}
