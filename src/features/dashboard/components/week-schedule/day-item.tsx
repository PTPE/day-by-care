type Props = {
  day: string;
  date: number;
  time: string[];
  isToday: boolean;
};

export default function DayItem({ day, date, time, isToday }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 w-16 text-xs md:gap-4">
      <div className="text-primary font-bold md:text-base">{day}</div>
      <div
        className={`font-bold w-8 h-8 rounded-full flex items-center justify-center md:text-base ${isToday ? 'bg-button-primary text-primary-foreground' : ''}`}
      >
        {date}
      </div>

      <div className="min-h-5 w-full flex justify-center items-center md:text-base">
        {time.length > 0 ? (
          <div className="flex flex-col gap-1">
            {time.map((item) => (
              <div
                key={item}
                className="bg-accent/30 text-accent-foreground px-2 py-1 font-bold rounded-lg whitespace-nowrap"
              >
                {item}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground opacity-50">-</div>
        )}
      </div>
    </div>
  );
}
