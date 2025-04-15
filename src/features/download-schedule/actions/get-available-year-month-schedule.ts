'use server';

import { createClient } from '@/utils/supabase/server';

type AvailableYearMonthScheduleResponse = {
  client_id: string;
  clientName: string;
  clientIcon: string;
  schedule: {
    schedule_id: string;
    year: number;
    month: number;
  }[];
}[];

export default async function getAvailableYearMonthScheduleAction(): Promise<AvailableYearMonthScheduleResponse> {
  const supabase = createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  if (!userId) throw new Error('User not found');

  const { data, error } = await supabase
    .from('client')
    .select(
      'user_id, client_id, clientName, clientIcon, schedule(schedule_id, year, month)'
    )
    .eq('user_id', userId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dataWithoutUserId = data?.map(({ user_id, ...rest }) => rest) || [];

  if (error) throw new Error(error.message);

  return dataWithoutUserId;
}
