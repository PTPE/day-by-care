type Props = {
  startTime: string;
  endTime: string;
};

export default function TimeSlot({ startTime, endTime }: Props) {
  return (
    <div className="bg-tertiary rounded-sm px-4 py-2">
      <div className="text-base">{`${startTime}-${endTime}`}</div>
    </div>
  );
}
