'use server';

import { ServiceItem } from '@/features/client/types/service-items';
import { createClient } from '@/utils/supabase/supabase-server';
import { MonthlyClientSchedule } from '@/features/schedule/types/monthly-client-schedule';

type TimeSlot = {
  schedule_id: string;
  start: string;
  end: string;
  schedule: {
    schedule_id: string;
    client_id: string;
    client: {
      client_id: string;
      clientName: string;
      address: string;
      serviceItems: ServiceItem[];
    };
    year: number;
    month: number;
  };
};

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

export default async function getMonthlyClientScheduleAction(
  schedule_id: string
): Promise<MonthlyClientSchedule> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('time_slots')
    .select(
      'schedule_id , start, end, schedule_id, schedule(schedule_id, client_id, year, month, client(client_id, clientName, address, serviceItems))'
    )
    .eq('schedule_id', schedule_id);

  if (error) throw new Error(error.message);

  const dataWithType = data as unknown as TimeSlot[];

  const timeSlots = dataWithType.map((schedule) => ({
    start: schedule.start,
    end: schedule.end,
  }));

  const formattedData = {
    schedule_id: dataWithType[0].schedule.schedule_id,
    client_name: dataWithType[0].schedule.client.clientName,
    address: dataWithType[0].schedule.client.address,
    service_items: dataWithType[0].schedule.client.serviceItems,
    year: dataWithType[0].schedule.year,
    month: dataWithType[0].schedule.month,
    time_slots: formatTimeSlots(timeSlots),
  };

  return formattedData;
}
