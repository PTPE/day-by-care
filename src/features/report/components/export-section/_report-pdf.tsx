/* eslint-disable react/no-array-index-key */

import { useSearchParams } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { zhTW } from 'date-fns/locale';

import { Schedule } from '@/types/client';
import fillMissingServiceDates from '@/utils/fill-missing-service-dates';
import { getMonthRange } from '@/utils/get-month-range';
import getTotalServiceHours from '@/utils/calculate-total-service-time-in-hours';
import './report.css';

type Props = {
  schedules: Schedule[];
};

export default function ReportPdf({ schedules }: Props) {
  const searchParams = useSearchParams();
  const year = Number(searchParams.get('year')) || new Date().getFullYear();
  const month = Number(searchParams.get('month')) || new Date().getMonth() + 1;

  const { startDate, endDate } = getMonthRange(year, month);

  const clients = schedules.map((schedule) => ({
    clientName: schedule.clientName,
    serviceTime: fillMissingServiceDates(
      startDate,
      endDate,
      schedule.serviceTime
    ),
  }));

  const dates = clients[0]?.serviceTime?.map((item) => item.date) || [];

  const totalHoursPerClient = schedules.map((schedule) => ({
    clientId: schedule.clientId,
    serviceTime: getTotalServiceHours(schedule.serviceTime),
  }));

  const totalHous = getTotalServiceHours(
    schedules.flatMap((schecule) => schecule.serviceTime)
  );

  return (
    <table
      id={`report-${year}-${month}`}
      className="absolute -top-[9999px] -left-[9999px] mt-4 border-collapse border border-black bg-white table-fixed w-full text-center text-black"
    >
      <colgroup>
        <col className="w-[60px]" />
        <col className="w-[60px]" />
        <col span={8} className="w-[100px]" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col" colSpan={10}>
            <div className="flex gap-10 items-center">
              <span className="text-lg">臺北市私立安家居家長照機構</span>
              <span className="text-lg">
                {year}年{month}月時數薪資統計表單
              </span>
              <span className="text-lg">居服員：</span>
            </div>
          </th>
        </tr>
        <tr className="h-[35px]">
          <td
            colSpan={2}
            className="relative w-[100px] h-[40px] overflow-hidden pb-3"
          >
            <div
              className="absolute left-0 top-0 w-full h-full pointer-events-none"
              style={{
                transform: 'rotate(18deg)',
                transformOrigin: 'top left',
                borderTop: '1px solid black',
                width: '141.5%',
              }}
            />

            <span className="absolute bottom-1 left-1 text-sm">日期</span>

            <span className="absolute top-0 right-1 text-sm">案主</span>
          </td>
          {clients.map((client) => (
            <td key={client.clientName}>{client.clientName}</td>
          ))}
          {Array.from({ length: 8 - clients.length }).map((_, i) => (
            <td key={i} />
          ))}
        </tr>
      </thead>

      <tbody>
        {dates.map((date, i) => {
          const dateObj = parseISO(date);
          const day = format(dateObj, 'd');
          const weekday = format(dateObj, 'EEEEE', { locale: zhTW });

          return (
            <tr key={date}>
              <td>{day}</td>
              <td>{weekday}</td>
              {clients.map((client) => {
                const dayService = client.serviceTime[i];
                const serviceTimeLength =
                  getTotalServiceHours(
                    dayService.serviceTime.map((time) => ({
                      date: dayService.date,
                      start: time.start,
                      end: time.end,
                    }))
                  ) || '';
                return <td key={client.clientName}>{serviceTimeLength}</td>;
              })}
              {Array.from({ length: 8 - clients.length }).map((_, index) => (
                <td key={index} />
              ))}
            </tr>
          );
        })}

        <tr>
          <td colSpan={2}>單項統計</td>
          {totalHoursPerClient.map((client) => (
            <td key={client.clientId}>{client.serviceTime}</td>
          ))}
          {Array.from({ length: 8 - clients.length }).map((_, index) => (
            <td key={index} />
          ))}
        </tr>

        <tr>
          <td colSpan={2}>總時數</td>
          <td colSpan={8}>{totalHous}</td>
        </tr>
      </tbody>
    </table>
  );
}
