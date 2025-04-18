'use client';

/* eslint-disable max-lines */

/* eslint-disable react/no-array-index-key */

import { MonthlyClientSchedule } from '@/features/schedule/types/monthly-client-schedule';
import generateMonthlyDateDayMap from '@/features/schedule/utils/generate-monthly-date-day-map';

type Props = {
  type: 'preview' | 'download';
  schedule: MonthlyClientSchedule;
};

export default function SecondHalfMonth({ type, schedule }: Props) {
  const dateDayMap = generateMonthlyDateDayMap({
    month: schedule.month,
    year: schedule.year,
  });

  function getStartOrEndTimeString(date: number, timeType: 'start' | 'end') {
    const timeSlot = schedule?.time_slots.find((slot) => slot.date === date);
    if (!timeSlot) return '';
    const time = timeSlot[timeType];
    const hours = time.hours.toString().padStart(2, '0');
    const minutes = time.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const isDownload = type === 'download';

  const downloadCellClass = isDownload ? 'p-[3px] pb-5' : '';
  const downloadTableClass = isDownload
    ? 'absolute w-[1440px] h-[990px] top-[-9999px] left-[-9999px]'
    : 'w-full';

  return (
    <table
      id={`${isDownload ? `second-half-month-${schedule.schedule_id}` : ''}`}
      className={`mt-4 border-collapse border border-black bg-white table-fixed ${downloadTableClass}`}
    >
      <thead>
        <tr>
          <th
            scope="col"
            colSpan={15}
            className={`text-center border-none ${downloadCellClass}`}
          >
            臺北市私立安家居家長照機構
          </th>
          <th className="text-right border-none" colSpan={3}>
            {schedule.year}年{schedule.month}月工作紀錄表
          </th>
        </tr>
        <tr>
          <th
            scope="col"
            colSpan={18}
            className={`text-left border-none ${downloadCellClass}`}
          >
            個案姓名：{schedule.client_name}
          </th>
        </tr>
        <tr>
          <th
            colSpan={18}
            className={`text-left border-none ${downloadCellClass}`}
          >
            個案地址：{schedule.address}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={4}>
            日期
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 16).map((day) => (
            <td
              key={day}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            >
              {day}
            </td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={4}>
            星期
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
            <td
              key={i}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            >
              {dateDayMap[i + 1] || ''}
            </td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={4}>
            體溫
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
            <td
              key={i}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            ></td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={4}>
            簽到
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
            <td
              key={i}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            >
              {getStartOrEndTimeString(i + 1, 'start')}
            </td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={4}>
            簽退
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
            <td
              key={i}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            >
              {getStartOrEndTimeString(i + 1, 'end')}
            </td>
          ))}
        </tr>
        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={20}>
            服務項目
          </th>
        </tr>

        {schedule.service_items.map((item) => (
          <tr key={item}>
            <th className={`text-center ${downloadCellClass}`} colSpan={4}>
              {item}
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td
                key={i}
                className={`text-center ${downloadCellClass}`}
                colSpan={1}
              ></td>
            ))}
          </tr>
        ))}

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={20}>
            其他
          </th>
        </tr>

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={4}>
            衛教教導
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
            <td
              key={i}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            ></td>
          ))}
        </tr>

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={4}>
            轉介服務
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
            <td
              key={i}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            ></td>
          ))}
        </tr>

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={4}>
            手部清潔
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
            <td
              key={i}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            ></td>
          ))}
        </tr>

        <tr>
          <th className={`text-center ${downloadCellClass}`} colSpan={20}>
            簽名
          </th>
        </tr>

        <tr>
          <th className={`text-center py-12 `} colSpan={4}>
            居服員簽名
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
            <td
              key={i}
              className={`text-center ${downloadCellClass}`}
              colSpan={1}
            ></td>
          ))}
        </tr>

        <tr>
          <th className={`text-center py-12 `} colSpan={4}>
            案主簽名
          </th>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
            <td key={i} className={`text-center `} colSpan={1}></td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
