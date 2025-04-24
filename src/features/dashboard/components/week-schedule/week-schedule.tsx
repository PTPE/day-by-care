import DayItem from './day-item';

export default function WeekSchedule() {
  return (
    <div className="flex flex-col gap-5 bg-card p-4 rounded-lg lg:p-8">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-accent rounded-full " />
        <div className="text-xl font-extrabold tracking-widest">本週班表</div>
      </div>
      <div className="flex justify-between">
        <DayItem day="三" date={23} time="10:00" isSelected={false} />
        <DayItem day="四" date={24} time="10:00" isSelected={false} />
        <DayItem day="五" date={25} time="10:00" isSelected />
        <DayItem day="六" date={26} time="10:00" isSelected={false} />
        <DayItem day="日" date={27} time="10:00" isSelected={false} />
        <DayItem day="一" date={28} time="10:00" isSelected={false} />
      </div>
    </div>
  );
}
