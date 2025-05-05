import { TypedSupabaseClient } from '@/utils/supabase/types';

export type GetSchedulesParams = {
  year: number;
  month: number;
};

export async function getSchedules(
  params: GetSchedulesParams,
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
    .gte('date', startDate)
    .lt('date', endDate);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export type GetServiceSummaryParams = GetSchedulesParams;

export async function getServiceSummary(
  params: GetSchedulesParams,
  client: TypedSupabaseClient
) {
  const startDate = new Date(params.year, params.month - 1, 1)
    .toISOString()
    .split('T')[0];
  const endDate = new Date(params.year, params.month, 1)
    .toISOString()
    .split('T')[0];

  const { data: clients, error: clientCountError } = await client
    .from('schedule')
    .select('client_id', { count: 'exact', head: false })
    .gte('date', startDate)
    .lte('date', endDate);

  const clientCount = Array.from(
    new Set(clients?.map((c) => c.client_id))
  ).length;

  if (clientCountError) {
    throw new Error(clientCountError.message);
  }

  const { data: totalSchedules, error: totalSchedulesError } = await client
    .from('schedule')
    .select('*', { count: 'exact', head: false })
    .gte('date', startDate)
    .lte('date', endDate);

  const totalServiceHours =
    totalSchedules
      ?.reduce((acc, schedule) => {
        const serviceHours =
          (new Date(`${schedule.date} ${schedule.service_end_time}`).getTime() -
            new Date(
              `${schedule.date} ${schedule.service_start_time}`
            ).getTime()) /
          (1000 * 60 * 60);
        return acc + serviceHours;
      }, 0)
      .toFixed(1) || 0;

  if (totalSchedulesError) {
    throw new Error(totalSchedulesError.message);
  }

  return { clientCount, totalServiceHours };
}
