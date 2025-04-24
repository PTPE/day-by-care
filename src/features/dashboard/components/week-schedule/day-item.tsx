type Props = {
  day: string;
  date: number;
  time: string;
  isSelected: boolean;
};

export default function DayItem({ day, date, time, isSelected }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 w-16 text-xs md:gap-4">
      <div className="text-primary font-bold md:text-base">{day}</div>
      <div
        className={`font-bold w-8 h-8 rounded-full flex items-center justify-center md:text-base ${isSelected ? 'bg-button-primary text-primary-foreground' : ''}`}
      >
        {date}
      </div>

      <div className="h-5 w-full flex justify-center items-center md:text-base">
        {time ? (
          <div className="bg-accent/30 text-accent-foreground px-2 py-1 font-bold rounded-lg whitespace-nowrap">
            {time}
          </div>
        ) : (
          <div className="text-muted-foreground opacity-50">-</div>
        )}
      </div>
    </div>
  );
}
