import Button from '@/ui/button';
import DatePicker from '@/ui/date-picker';
import Label from '@/ui/label';

import TimeSlot from './_time-slot';

export default function Attendance() {
  return (
    <div className="flex flex-col gap-5 bg-card p-4 rounded-lg lg:p-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-accent rounded-full " />
        <div className="text-xl font-extrabold tracking-widest">簽到簽退</div>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm md:text-base">日期</Label>
        <DatePicker />
      </div>

      <TimeSlot />

      <Button variant="outline" className="border-accent text-sm">
        <div className="flex items-center gap-1 text-accent">
          <span className="icon-[material-symbols--add-2-rounded] text-lg" />
          新增時段
        </div>
      </Button>

      <Button variant="default">
        <div className="flex items-center gap-1 text-primary-foreground">
          <span className="icon-[material-symbols--check-rounded] text-xl" />
          確認
        </div>
      </Button>
    </div>
  );
}
