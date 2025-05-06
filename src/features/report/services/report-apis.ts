import { TypedSupabaseClient } from '@/utils/supabase/types';
import { calculateServiceTimeLengthInHours } from '@/features/report/utils';
import { ClientServiceSummary } from '@/features/report/types';

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
        const serviceHours = calculateServiceTimeLengthInHours(
          schedule.date ?? '',
          schedule.service_start_time ?? '',
          schedule.service_end_time ?? ''
        );

        return acc + Number(serviceHours);
      }, 0)
      .toFixed(1) || 0;

  if (totalSchedulesError) {
    throw new Error(totalSchedulesError.message);
  }

  return { clientCount, totalServiceHours };
}

export type GetClientsServiceSummaryParams = {
  year: number;
  month: number;
};

export async function getClientsServiceSummary(
  params: GetClientsServiceSummaryParams,
  supabaseClient: TypedSupabaseClient
) {
  const startDate = new Date(params.year, params.month - 1, 1)
    .toISOString()
    .split('T')[0];
  const endDate = new Date(params.year, params.month, 1)
    .toISOString()
    .split('T')[0];

  const { data: clients, error: clientCountError } = await supabaseClient
    .from('schedule')
    .select('*, client(client_name, client_icon, service_item_ids)')
    .gte('date', startDate)
    .lte('date', endDate);

  const formattedClientsData = Array.from(
    new Set(clients?.map((c) => c.client_id))
  ).map((clientId) => {
    const clientServiceLogs = clients?.filter((c) => c.client_id === clientId);
    const clientName = clientServiceLogs?.[0]?.client?.client_name;
    const clientIcon = clientServiceLogs?.[0]?.client?.client_icon;
    const serviceItemIds = clientServiceLogs?.[0]?.client?.service_item_ids;
    const serviceItemIdDays = Number(clientServiceLogs?.length);
    const serviceTimeLengthInHours = clientServiceLogs?.reduce(
      (acc, c) =>
        acc +
        calculateServiceTimeLengthInHours(
          c.date ?? '',
          c.service_start_time ?? '',
          c.service_end_time ?? ''
        ),
      0
    );

    return {
      clientId,
      clientName,
      clientIcon,
      serviceItemIds,
      serviceTimeLengthInHours,
      serviceItemIdDays,
    };
  });

  if (clientCountError) {
    throw new Error(clientCountError.message);
  }

  return formattedClientsData as ClientServiceSummary[];
}
