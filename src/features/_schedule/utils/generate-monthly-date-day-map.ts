type Props = {
  year: number;
  month: number;
};

export default function generateMonthlyDateDayMap({ year, month }: Props) {
  const dateDayMap: Record<number, string> = {};
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    dateDayMap[day] = dayNames[dayOfWeek];
  }

  return dateDayMap;
}
