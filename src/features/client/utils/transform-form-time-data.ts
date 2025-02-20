import { z } from 'zod';
import { set } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import {
  clientScheduleSchema,
  createScheduleFormSchema,
} from '@/features/schedule/models/create-schedule-form-schema';
import { ParamsCreateSchedule } from '@/features/schedule/actions/create-client-schedule-action';

type TransformFormTimeDataProps = {
  year: number;
  month: number;
  timeSlots: z.infer<typeof clientScheduleSchema>['timeSlots'];
};

export function transformFormTimeData({
  year,
  month,
  timeSlots,
}: TransformFormTimeDataProps) {
  const daysInMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, dayIndex) => {
    const date = new Date(year, month - 1, dayIndex + 1);
    const dayOfWeek = date.getDay() + 1; // 1 to 7 (1 = Sunday, 7 = Saturday)

    return timeSlots
      .filter((timeSlot) => timeSlot.day === dayOfWeek)
      .flatMap(({ workTime }) =>
        workTime.map(({ start, end }) => {
          const startDate = set(date, {
            hours: start.hour,
            minutes: start.minute,
          });
          const endDate = set(date, { hours: end.hour, minutes: end.minute });

          // 使用 date-fns-tz 的 formatInTimeZone 將時間轉換為指定時區的格式
          const startInTimeZone = formatInTimeZone(
            startDate,
            'Asia/Taipei',
            "yyyy-MM-dd'T'HH:mm:ssXXX"
          );
          const endInTimeZone = formatInTimeZone(
            endDate,
            'Asia/Taipei',
            "yyyy-MM-dd'T'HH:mm:ssXXX"
          );

          return {
            start: startInTimeZone,
            end: endInTimeZone,
          };
        })
      );
  })
    .flat()
    .filter(
      (time) => new Date(time.start).getTime() < new Date(time.end).getTime()
    );
}

type TransFormDataProps = {
  year: number;
  month: number;
  data: z.infer<typeof createScheduleFormSchema>;
};

export default function transFormData({
  year,
  month,
  data,
}: TransFormDataProps): ParamsCreateSchedule[] {
  return data.schedules.map((schedule) => ({
    client_id: schedule.client_id,
    month,
    year,
    timeSlots: transformFormTimeData({
      year,
      month,
      timeSlots: schedule.timeSlots,
    }),
  }));
}
