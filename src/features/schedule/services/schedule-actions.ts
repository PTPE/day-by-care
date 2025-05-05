'use server';

/* eslint-disable react-hooks/rules-of-hooks */
import { cookies } from 'next/headers';

import useSupabaseServer from '@/utils/supabase/supabase-server';
import { MonthSchedule } from '@/features/schedule/types';

type UpdateScheduleParams = {
  clientId: string;
  monthSchedule: MonthSchedule;
};

export async function updateSchedule(params: UpdateScheduleParams) {
  const cookieStore = cookies();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const client = useSupabaseServer(cookieStore);

  const { data, error } = await client.rpc('replace_day_schedules', {
    p_client_id: params.clientId,
    p_new_schedules: params.monthSchedule,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
