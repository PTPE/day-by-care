'use server';

import { createClient } from '@/utils/supabase/server';
import { MonthlyClientsSchedule } from '@/features/schedule/types/monthly-clients-schedule';

export type ParamsGetMonthlyClientsSchedule = {
  year: number;
  month: number;
};

type RawData = {
  client_id: string;
  schedule: {
    time_slots: {
      start: string;
      end: string;
    }[];
  }[];
}[];

function formatTimeSlots(time_slots: { start: string; end: string }[]) {
  return time_slots.map((slot) => {
    const start = new Date(slot.start);
    const end = new Date(slot.end);

    return {
      date: start.getDate(),
      day: start.getDay(),
      start: {
        hours: start.getHours(),
        minutes: start.getMinutes(),
      },
      end: {
        hours: end.getHours(),
        minutes: end.getMinutes(),
      },
    };
  });
}

export async function getMonthlyClientsScheduleAction({
  year,
  month,
}: ParamsGetMonthlyClientsSchedule): Promise<MonthlyClientsSchedule | null> {
  const supabase = createClient();

  const userId = (await supabase.auth.getUser()).data.user?.id;

  if (!userId) return null;

  const { data, error } = await supabase
    .from('client')
    .select('client_id, user_id, schedule(year, month, time_slots(start, end))')
    .eq('user_id', userId)
    .eq('schedule.year', year)
    .eq('schedule.month', month);

  if (error) throw new Error(error.message);

  const formattedData = {
    year,
    month,
    schedules: (data as RawData)
      .filter((client) => client.schedule.length)
      .flatMap((client) =>
        client.schedule.flatMap((schedule) => {
          const emptyDays = Array.from({ length: 7 }, (_, i) => ({
            day: i,
            time_range: [] as {
              start: { hour: number; minute: number };
              end: { hour: number; minute: number };
            }[],
          }));

          // eslint-disable-next-line @typescript-eslint/naming-convention
          const time_slots = schedule.time_slots.reduce(
            (acc, time_slot) => {
              const day = new Date(time_slot.start).getDay();

              // eslint-disable-next-line @typescript-eslint/naming-convention
              const time_range = {
                start: {
                  hour: new Date(time_slot.start).getHours(),
                  minute: new Date(time_slot.start).getMinutes(),
                },
                end: {
                  hour: new Date(time_slot.end).getHours(),
                  minute: new Date(time_slot.end).getMinutes(),
                },
              };

              const existingDay = acc.find((item) => item.day === day);
              if (existingDay) {
                const isDuplicate = existingDay.time_range.some(
                  (range) =>
                    range.start.hour === time_range.start.hour &&
                    range.start.minute === time_range.start.minute &&
                    range.end.hour === time_range.end.hour &&
                    range.end.minute === time_range.end.minute
                );
                if (!isDuplicate) {
                  existingDay.time_range.push(time_range);
                }
              }

              return acc;
            },
            [...emptyDays]
          );

          return {
            client_id: client.client_id,
            time_slots,
          };
        })
      ),
  };

  return formattedData;
}
