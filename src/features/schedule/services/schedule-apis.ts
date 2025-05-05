import { TypedSupabaseClient } from '@/utils/supabase/types';

export type GetScheduleParams = {
  clientId: string;
  year: number;
  month: number;
};

export async function getSchedule(
  params: GetScheduleParams,
  client: TypedSupabaseClient
) {
  const startDate = new Date(params.year, params.month - 1, 1)
    .toISOString()
    .split('T')[0];
  const endDate = new Date(params.year, params.month, 1)
    .toISOString()
    .split('T')[0];

  const { data, error } = await client
    .from('schedule')
    .select('*')
    .eq('client_id', params.clientId)
    .gte('date', startDate)
    .lt('date', endDate);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
