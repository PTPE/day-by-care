import Input from '@/ui/input';

type Props = {
  day: number;
};

const days = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
];

export default function Day({ day }: Props) {
  return (
    <div className="border border-line p-3 rounded-md flex flex-col gap-2 items-center text-sm">
      <div className="font-bold">{days[day - 1]}</div>
      <Input type="time" />
      <div className="font-bold">到</div>
      <Input type="time" />
    </div>
  );
}
