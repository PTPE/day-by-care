import Input from '@/ui/input';

export default function TimeSlot() {
  return (
    <div className="border border-line p-4 rounded-md space-y-5">
      <div className="flex items-center gap-2">
        <div className="icon-[material-symbols--nest-clock-farsight-analog-outline]" />
        時段
        <div className="icon-[material-symbols--delete-outline] ml-auto bg-destructive cursor-pointer" />
      </div>

      <div className="flex items-center gap-2">
        <Input type="time" className="inline w-full text-base h-auto p-2" />
        <Input type="time" className="inline w-full text-base h-auto p-2" />
      </div>
    </div>
  );
}
