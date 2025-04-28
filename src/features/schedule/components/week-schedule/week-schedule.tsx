import Day from './_day';

export default function WeekSchedule() {
  return (
    <div className="flex flex-col">
      <div className="px-4 py-3 bg-tertiary text-tertiary-foreground rounded-t-md border border-line border-b-0 font-bold">
        週班表
      </div>

      <div className="flex gap-5 bg-card p-2 rounded-b-md overflow-auto">
        <Day day={7} />
        <Day day={1} />
        <Day day={2} />
        <Day day={3} />
        <Day day={4} />
        <Day day={5} />
        <Day day={6} />
      </div>
    </div>
  );
}
