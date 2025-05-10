import { format } from 'date-fns';

import { TypedSupabaseClient } from '@/utils/supabase/types';
import { getThisWeekDateRange } from '@/features/dashboard/utils';
import {
  Attendance,
  ClientList,
  ClientsInfo,
  ServiceTime,
} from '@/features/dashboard/types';

export async function getThisWeekServiceClients(
  supabaseClient: TypedSupabaseClient
) {
  const { startOfThisWeek, endOfThisWeek } = getThisWeekDateRange();

  const startOfThisWeekInSQLDate = format(startOfThisWeek, 'yyyy-MM-dd');
  const endOfThisWeekInSQLDate = format(endOfThisWeek, 'yyyy-MM-dd');

  const { data, error } = await supabaseClient
    .from('schedule')
    .select(
      '*, client(client_name, client_icon, address, emergency_contact_phone, supervisor_name, service_item_ids)'
    )
    .gte('date', startOfThisWeekInSQLDate)
    .lte('date', endOfThisWeekInSQLDate);

  if (error) {
    throw new Error(error.message);
  }

  const clientMap = new Map<string, (typeof data)[number]['client']>();

  const serviceTimeMap: ServiceTime = {};

  data.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { client_id, date, service_start_time, service_end_time } = item;

    if (!client_id || !date || !service_start_time || !service_end_time) return;

    if (!serviceTimeMap[client_id]) {
      serviceTimeMap[client_id] = {};
    }

    if (!serviceTimeMap[client_id][date]) {
      serviceTimeMap[client_id][date] = [];
    }

    serviceTimeMap[client_id][date].push({
      startTime: service_start_time,
      endTime: service_end_time,
    });
  });

  data.forEach((item) => {
    if (item.client_id && item.client) {
      clientMap.set(item.client_id, item.client);
    }
  });

  const clientList = Array.from(clientMap, ([clientId, client]) => ({
    clientId,
    clientName: client?.client_name || '',
  }));

  const clientInfo = Object.fromEntries(
    Array.from(clientMap).map(([clientId, client]) => [
      clientId,
      {
        clientName: client?.client_name || '',
        clientIcon: client?.client_icon || '',
        address: client?.address || '',
        emergencyContactPhone: client?.emergency_contact_phone || '',
        supervisorName: client?.supervisor_name || '',
        serviceItemIds: client?.service_item_ids || [],
      },
    ])
  );

  return {
    clientList,
    clientInfo,
    serviceTime: serviceTimeMap,
  };
}

export type GetServiceTimeByClientIdAndDateParams = {
  clientId: string;
  date: string;
};

export async function getServiceTimeByClientIdAndDate(
  supabaseClient: TypedSupabaseClient,
  params: GetServiceTimeByClientIdAndDateParams
) {
  const { data, error } = await supabaseClient
    .from('schedule')
    .select('service_start_time, service_end_time, date')
    .eq('client_id', params.clientId)
    .eq('date', params.date);

  if (error) {
    throw new Error(error.message);
  }

  const formattedData = data.map((item) => ({
    startTime: item.service_start_time,
    endTime: item.service_end_time,
  }));

  return formattedData as Attendance;
}

export async function getThisWeekClientsInfo(
  supabaseClient: TypedSupabaseClient
): Promise<{ clientList: ClientList; clientsInfo: ClientsInfo }> {
  const { startOfThisWeek, endOfThisWeek } = getThisWeekDateRange();

  const startOfThisWeekInSQLDate = format(startOfThisWeek, 'yyyy-MM-dd');
  const endOfThisWeekInSQLDate = format(endOfThisWeek, 'yyyy-MM-dd');

  const { data, error } = await supabaseClient
    .from('schedule')
    .select(
      'client_id, client(client_name, client_icon, address, emergency_contact_phone, supervisor_name, service_item_ids)'
    )
    .gte('date', startOfThisWeekInSQLDate)
    .lte('date', endOfThisWeekInSQLDate);

  if (error) {
    throw new Error(error.message);
  }

  const clientMap = new Map<string, (typeof data)[number]['client']>();

  data.forEach((item) => {
    if (item.client_id && item.client) {
      clientMap.set(item.client_id, item.client);
    }
  });

  const clientList = Array.from(clientMap, ([clientId, client]) => ({
    clientId,
    clientName: client?.client_name || '',
  }));

  const clientsInfo: ClientsInfo = Object.fromEntries(
    Array.from(clientMap).map(([clientId, client]) => [
      clientId,
      {
        clientName: client?.client_name ?? '',
        clientIcon: client?.client_icon ?? '',
        address: client?.address ?? '',
        emergencyContactPhone: client?.emergency_contact_phone ?? '',
        supervisorName: client?.supervisor_name ?? '',
        serviceItemIds: client?.service_item_ids ?? [],
      },
    ])
  );

  return { clientList, clientsInfo };
}

export async function getThisWeekServiceTimeOfClient(
  supabaseClient: TypedSupabaseClient
): Promise<ServiceTime> {
  const { startOfThisWeek, endOfThisWeek } = getThisWeekDateRange();

  const startOfThisWeekInSQLDate = format(startOfThisWeek, 'yyyy-MM-dd');
  const endOfThisWeekInSQLDate = format(endOfThisWeek, 'yyyy-MM-dd');

  const { data, error } = await supabaseClient
    .from('schedule')
    .select('service_start_time, service_end_time, date, client_id')
    .gte('date', startOfThisWeekInSQLDate)
    .lte('date', endOfThisWeekInSQLDate);

  const serviceTimeMap: ServiceTime = {};

  data?.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { client_id, date, service_start_time, service_end_time } = item;

    if (!client_id || !date || !service_start_time || !service_end_time) return;

    if (!serviceTimeMap[client_id]) {
      serviceTimeMap[client_id] = {};
    }

    if (!serviceTimeMap[client_id][date]) {
      serviceTimeMap[client_id][date] = [];
    }

    serviceTimeMap[client_id][date].push({
      startTime: service_start_time,
      endTime: service_end_time,
    });
  });

  if (error) {
    throw new Error(error.message);
  }

  return serviceTimeMap;
}
