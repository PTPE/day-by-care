'use server';

import { ServiceItem } from '@/features/client/types/service-items';
import { MonthlyClientSchedule } from '@/features/schedule/types/monthly-client-schedule';
import { createClient } from '@/utils/supabase/supabase-server';

export type ParamsGetClientsSchedules = {
  scheduleIds: string[];
};

type TimeSlot = {
  schedule_id: string;
  client_id: string;
  client: {
    address: string;
    clientIcon: string;
    clientName: string;
    serviceItems: ServiceItem[];
  };
  time_slots: {
    start: string;
    end: string;
  }[];
  year: number;
  month: number;
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

export default async function getClientsSchedulesAction({
  scheduleIds,
}: ParamsGetClientsSchedules): Promise<MonthlyClientSchedule[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('schedule')
    .select(
      'schedule_id, client_id, year, month, client(clientName, clientIcon, address, serviceItems), time_slots(start, end)'
    )
    .in('schedule_id', scheduleIds);

  if (error) throw new Error(error.message);

  const dataWithType = data as unknown as TimeSlot[];

  const formattedData = dataWithType.map((schedule) => ({
    schedule_id: schedule.schedule_id,
    client_name: schedule.client.clientName,
    address: schedule.client.address,
    service_items: schedule.client.serviceItems,
    year: schedule.year,
    month: schedule.month,
    time_slots: formatTimeSlots(schedule.time_slots),
  }));

  return formattedData;
}
