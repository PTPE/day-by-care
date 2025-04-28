import MonthSchedule from '@/features/schedule/components/month-schedule';
import WeekSchedule from '@/features/schedule/components/week-schedule';
import Button from '@/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[3fr_1fr] gap-5">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="選擇案主" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">案主1</SelectItem>
            <SelectItem value="2">案主2</SelectItem>
            <SelectItem value="3">案主3</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="選擇年月" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">2025年1月</SelectItem>
            <SelectItem value="2">2025年2月</SelectItem>
            <SelectItem value="3">2025年3月</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <WeekSchedule />
      </div>

      <div className="overflow-auto">
        <MonthSchedule />
      </div>

      <div className="flex gap-5 mb-5">
        <Button className="w-full">匯出PDF</Button>
        <Button variant="accent" className="w-full">
          至Ibon列印
        </Button>
      </div>
    </div>
  );
}
