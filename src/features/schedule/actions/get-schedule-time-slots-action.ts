'use server';

import { createClient } from '@/utils/supabase/server';

export default async function getScheduleTimeSlots(schedule_id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('time_slots')
    .select('schedule_id , start, end')
    .eq('schedule_id', schedule_id);

  if (error) throw new Error(error.message);

  return data;
}
