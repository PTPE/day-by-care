'use server';

/* eslint-disable react-hooks/rules-of-hooks */
import { cookies } from 'next/headers';

import useSupabaseServer from '@/utils/supabase/supabase-server';

type UpdateScheduleParams = {
  clientId: string;
  serviceTimePerDay: {
    date: string;
    serviceTime: {
      startTime: string;
      endTime: string;
    };
  }[];
};

export async function updateServiceTimeByDay(params: UpdateScheduleParams) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const client = useSupabaseServer(cookieStore);

  const { data, error } = await client.rpc('replace_day_schedules', {
    p_client_id: params.clientId,
    p_new_schedules: params.serviceTimePerDay.map((day) => ({
      date: day.date,
      service_start_time: day.serviceTime.startTime,
      service_end_time: day.serviceTime.endTime,
    })),
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
