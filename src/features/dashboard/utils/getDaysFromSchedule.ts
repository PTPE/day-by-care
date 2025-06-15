import { addDays, format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

import { ServiceTime, Schedule } from '@/types/client';

type Day = {
  day: string;
  date: number;
  time: string[];
  isToday: boolean;
};

// schedules 是 Schedule[]，並且你要從中取某個 client 的資料
// 這邊示範取 clientId 為 selectedClientId 的 serviceTime 陣列
export default function getDaysFromSchedules(
  schedules: Schedule[],
  selectedClientId: string,
  startOfThisWeek: string
): Day[] {
  const days: Day[] = [];

  // 找到該 client 的 serviceTime
  const schedule = schedules.find((s) => s.clientId === selectedClientId);
  const serviceTime = schedule?.serviceTime ?? [];

  // 建立一個以 date (yyyy-MM-dd) 當 key，對應所有該日時間的物件
  const serviceTimeByDate: Record<string, ServiceTime[]> = {};

  serviceTime.forEach((st: ServiceTime) => {
    if (!serviceTimeByDate[st.date]) {
      serviceTimeByDate[st.date] = [];
    }
    serviceTimeByDate[st.date].push(st);
  });

  const startDate = new Date(startOfThisWeek);

  for (let i = 0; i < 7; i += 1) {
    const date = addDays(startDate, i);
    const dateInSQL = format(date, 'yyyy-MM-dd');
    const isToday = format(new Date(), 'yyyy-MM-dd') === dateInSQL;

    if (serviceTimeByDate[dateInSQL]) {
      days.push({
        day: format(date, 'EEEEE', { locale: zhTW }),
        date: date.getDate(),
        time: serviceTimeByDate[dateInSQL].map((item) => item.start || ''),
        isToday,
      });
    } else {
      days.push({
        day: format(date, 'EEEEE', { locale: zhTW }),
        date: date.getDate(),
        time: [],
        isToday,
      });
    }
  }

  return days;
}
