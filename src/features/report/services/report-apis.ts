import { TypedSupabaseClient } from '@/utils/supabase/types';
import {
  calculateServiceTimeLengthInHours,
  sumServiceHours,
} from '@/features/report/utils';
import {
  ClientServiceLogPerDay,
  ClientServiceSummary,
} from '@/features/report/types';

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

  const totalServiceHours = sumServiceHours(totalSchedules ?? []);

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
    const totalServiceHours = sumServiceHours(clientServiceLogs ?? []);

    return {
      clientId,
      clientName,
      clientIcon,
      serviceItemIds,
      totalServiceHours,
      serviceItemIdDays,
    };
  });

  if (clientCountError) {
    throw new Error(clientCountError.message);
  }

  return formattedClientsData as ClientServiceSummary[];
}

export type GetClientServiceDetailParams = {
  clientId: string;
  year: number;
  month: number;
};

export async function getClientServiceDetail(
  supabaseClient: TypedSupabaseClient,
  params: GetClientServiceDetailParams
) {
  const startDate = new Date(params.year, params.month - 1, 1)
    .toISOString()
    .split('T')[0];
  const endDate = new Date(params.year, params.month, 1)
    .toISOString()
    .split('T')[0];

  const { data, error } = await supabaseClient
    .from('schedule')
    .select('*, client(client_name)')
    .eq('client_id', params.clientId)
    .gte('date', startDate)
    .lte('date', endDate);

  const groupedByDate = new Map<string, typeof data>();

  data?.forEach((entry) => {
    if (!entry.date) return;
    if (!groupedByDate.has(entry.date)) {
      groupedByDate.set(entry.date, []);
    }
    groupedByDate.get(entry.date)!.push(entry);
  });

  const formattedData = data?.map((schedule) => {
    const date = schedule.date ?? '';
    const dailyService = groupedByDate.get(date) ?? [];

    return {
      clientId: schedule.client_id,
      clientName: schedule.client?.client_name ?? '',
      scheduleId: schedule.schedule_id,
      date,
      serviceTotalHours: calculateServiceTimeLengthInHours({
        date,
        service_start_time: schedule.service_start_time ?? '',
        service_end_time: schedule.service_end_time ?? '',
      }),
      serviceTime: dailyService.map((timeSlot) => ({
        startTime: timeSlot.service_start_time ?? '',
        endTime: timeSlot.service_end_time ?? '',
      })),
    };
  });

  if (error) {
    throw new Error(error.message);
  }

  return formattedData as ClientServiceLogPerDay[];
}

export type UpdateClientServiceLogParams = {
  scheduleId: string;
  serviceTime: {
    startTime: string;
    endTime: string;
  }[];
};

export async function updateClientServiceLog(
  supabaseClient: TypedSupabaseClient,
  params: UpdateClientServiceLogParams
) {
  const { data, error } = await supabaseClient
    .from('schedule')
    .update({
      service_start_time: params.serviceTime[0].startTime,
      service_end_time: params.serviceTime[0].endTime,
    })
    .eq('schedule_id', params.scheduleId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
