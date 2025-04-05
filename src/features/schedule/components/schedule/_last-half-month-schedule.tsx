/* eslint-disable max-lines */
/* eslint-disable react/no-array-index-key */

import { MonthlyClientSchedule } from '@/features/schedule/types/monthly-client-schedule';
import generateMonthlyDateDayMap from '@/features/schedule/utils/generate-monthly-date-day-map';

type Props = {
  schedule: MonthlyClientSchedule;
};

export default function LastHalfMonth({ schedule }: Props) {
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

  return (
    <>
      <table className="w-full mt-4 border-collapse border border-black bg-white table-fixed">
        <thead>
          <tr>
            <th scope="col" colSpan={15} className="text-center border-none">
              臺北市私立安家居家長照機構
            </th>
            <th className="text-right border-none" colSpan={3}>
              {schedule.year}年{schedule.month}月工作紀錄表
            </th>
          </tr>
          <tr>
            <th scope="col" colSpan={18} className="text-left border-none">
              個案姓名：{schedule.client_name}
            </th>
          </tr>
          <tr>
            <th colSpan={18} className="text-left border-none">
              個案地址：{schedule.address}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="text-center" colSpan={4}>
              日期
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 16).map((day) => (
              <td key={day} className="text-center" colSpan={1}>
                {day}
              </td>
            ))}
          </tr>
          <tr>
            <th className="text-center" colSpan={4}>
              星期
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center" colSpan={1}>
                {dateDayMap[i + 1] || ''}
              </td>
            ))}
          </tr>
          <tr>
            <th className="text-center" colSpan={4}>
              體溫
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center" colSpan={1}></td>
            ))}
          </tr>
          <tr>
            <th className="text-center" colSpan={4}>
              簽到
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center" colSpan={1}>
                {getStartOrEndTimeString(i + 1, 'start')}
              </td>
            ))}
          </tr>
          <tr>
            <th className="text-center" colSpan={4}>
              簽退
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center" colSpan={1}>
                {getStartOrEndTimeString(i + 1, 'end')}
              </td>
            ))}
          </tr>
          <tr>
            <th className="text-center" colSpan={19}>
              服務項目
            </th>
          </tr>

          {schedule.service_items.map((item) => (
            <tr key={item}>
              <th className="text-center" colSpan={4}>
                {item}
              </th>
              {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
                <td key={i} className="text-center" colSpan={1}></td>
              ))}
            </tr>
          ))}

          <tr>
            <th className="text-center" colSpan={19}>
              其他
            </th>
          </tr>

          <tr>
            <th className="text-center" colSpan={4}>
              衛教教導
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center" colSpan={1}></td>
            ))}
          </tr>

          <tr>
            <th className="text-center" colSpan={4}>
              轉介服務
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center" colSpan={1}></td>
            ))}
          </tr>

          <tr>
            <th className="text-center" colSpan={4}>
              手部清潔
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center" colSpan={1}></td>
            ))}
          </tr>

          <tr>
            <th className="text-center" colSpan={19}>
              簽名
            </th>
          </tr>

          <tr>
            <th className="text-center py-5" colSpan={4}>
              居服員簽名
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center" colSpan={1}></td>
            ))}
          </tr>

          <tr>
            <th className="text-center py-5" colSpan={4}>
              案主簽名
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center" colSpan={1}></td>
            ))}
          </tr>
        </tbody>
      </table>

      <table
        id="last-half-month"
        className="w-full mt-4 border-collapse border border-black bg-white table-fixed absolute top-[-9999px] left-[-9999px]"
      >
        <thead>
          <tr>
            <th
              scope="col"
              colSpan={15}
              className="text-center border-none pb-5"
            >
              臺北市私立安家居家長照機構
            </th>
            <th className="text-right border-none" colSpan={3}>
              {schedule.year}年{schedule.month}月工作紀錄表
            </th>
          </tr>
          <tr>
            <th scope="col" colSpan={18} className="text-left border-none pb-5">
              個案姓名：{schedule.client_name}
            </th>
          </tr>
          <tr>
            <th colSpan={18} className="text-left border-none pb-5">
              個案地址：{schedule.address}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="text-center pb-5" colSpan={4}>
              日期
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 16).map((day) => (
              <td key={day} className="text-center pb-5" colSpan={1}>
                {day}
              </td>
            ))}
          </tr>
          <tr>
            <th className="text-center pb-5" colSpan={4}>
              星期
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center pb-5" colSpan={1}>
                {dateDayMap[i + 1] || ''}
              </td>
            ))}
          </tr>
          <tr>
            <th className="text-center pb-5" colSpan={4}>
              體溫
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center pb-5" colSpan={1}></td>
            ))}
          </tr>
          <tr>
            <th className="text-center pb-5" colSpan={4}>
              簽到
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center pb-5" colSpan={1}>
                {getStartOrEndTimeString(i + 1, 'start')}
              </td>
            ))}
          </tr>
          <tr>
            <th className="text-center pb-5" colSpan={4}>
              簽退
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center pb-5" colSpan={1}>
                {getStartOrEndTimeString(i + 1, 'end')}
              </td>
            ))}
          </tr>
          <tr>
            <th className="text-center pb-5" colSpan={19}>
              服務項目
            </th>
          </tr>

          {schedule.service_items.map((item) => (
            <tr key={item}>
              <th className="text-center pb-5" colSpan={4}>
                {item}
              </th>
              {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
                <td key={i} className="text-center pb-5" colSpan={1}></td>
              ))}
            </tr>
          ))}

          <tr>
            <th className="text-center pb-5" colSpan={19}>
              其他
            </th>
          </tr>

          <tr>
            <th className="text-center pb-5" colSpan={4}>
              衛教教導
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center pb-5" colSpan={1}></td>
            ))}
          </tr>

          <tr>
            <th className="text-center pb-5" colSpan={4}>
              轉介服務
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center pb-5" colSpan={1}></td>
            ))}
          </tr>

          <tr>
            <th className="text-center pb-5" colSpan={4}>
              手部清潔
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center pb-5" colSpan={1}></td>
            ))}
          </tr>

          <tr>
            <th className="text-center pb-5" colSpan={19}>
              簽名
            </th>
          </tr>

          <tr>
            <th className="text-center pb-5 py-5" colSpan={4}>
              居服員簽名
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center pb-5" colSpan={1}></td>
            ))}
          </tr>

          <tr>
            <th className="text-center pb-5 py-5" colSpan={4}>
              案主簽名
            </th>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((_, i) => (
              <td key={i} className="text-center pb-5" colSpan={1}></td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
