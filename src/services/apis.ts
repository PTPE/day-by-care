import { Client, Schedule } from '@/types/client';
import { TypedSupabaseClient } from '@/utils/supabase/types';

export type GetClientsParams = {
  clientIds?: string[];
  startDate?: string;
  endDate?: string;
  clientName?: string;
};

export async function getClients(
  supabaseClient: TypedSupabaseClient,
  params: {
    startDate?: string;
    endDate?: string;
    clientIds?: string[];
    clientName?: string;
  } = {}
): Promise<Client[]> {
  const { startDate, endDate, clientIds, clientName } = params;

  let clientQuery = supabaseClient.from('client').select('*');

  if (clientIds && clientIds.length > 0) {
    clientQuery = clientQuery.in('client_id', clientIds);
  }

  if (clientName) {
    clientQuery = clientQuery.ilike('client_name', `%${clientName}%`);
  }

  const { data: clients, error: clientError } = await clientQuery;
  if (clientError) throw new Error(clientError.message);

  if (!clients || clients.length === 0) return [];

  let scheduleQuery = supabaseClient.from('schedule').select('client_id, date');

  if (startDate) {
    scheduleQuery = scheduleQuery.gte('date', startDate);
  }
  if (endDate) {
    scheduleQuery = scheduleQuery.lte('date', endDate);
  }

  const clientIdList = clients.map((c) => c.client_id);
  scheduleQuery = scheduleQuery.in('client_id', clientIdList);

  const { data: schedules, error: scheduleError } = await scheduleQuery;
  if (scheduleError) throw new Error(scheduleError.message);

  const scheduleMap = new Map<string, { date: string }[]>();
  schedules?.forEach((s) => {
    const arr = scheduleMap.get(s.client_id) ?? [];
    arr.push({ date: s.date || '' });
    scheduleMap.set(s.client_id, arr);
  });

  return clients.map((client) => ({
    clientId: client.client_id,
    clientName: client.client_name,
    clientIcon: client.client_icon ?? '',
    birthday: new Date(client.birthday),
    address: client.address ?? null,
    emergencyContact: client.emergency_contact,
    emergencyContactPhone: client.emergency_contact_phone ?? null,
    supervisorName: client.supervisor_name ?? null,
    supervisorPhone: client.supervisor_phone,
    serviceItemIds: client.service_item_ids ?? [],
    officePhone: client.office_phone,
  }));
}

export type GetSchedulesParams = {
  clientIds?: string[];
  startDate?: string;
  endDate?: string;
};

export async function getSchedules(
  supabaseClient: TypedSupabaseClient,
  params: GetSchedulesParams
): Promise<Schedule[]> {
  const { clientIds, startDate, endDate } = params;

  let query = supabaseClient
    .from('schedule')
    .select('*, client(client_id, client_name)');

  if (params.startDate) {
    query = query.gte('date', startDate);
  }

  if (params.endDate) {
    query = query.lte('date', endDate);
  }

  if (clientIds && clientIds.length > 0) {
    query = query.in('client_id', clientIds);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const clientMap = new Map<
    string,
    {
      clientId: string;
      clientName: string;
      serviceTime: { start: string; end: string; date: string }[];
    }
  >();

  data?.forEach((item) => {
    if (!item.client || !item.client_id) return;

    const id = item.client_id;
    const name = item.client.client_name;
    const start = item.service_start_time ?? '';
    const end = item.service_end_time ?? '';
    const date = item.date ?? '';

    if (!clientMap.has(id)) {
      clientMap.set(id, {
        clientId: id,
        clientName: name,
        serviceTime: [],
      });
    }

    const group = clientMap.get(id)!;
    group.serviceTime.push({ start, end, date });
  });

  const result = Array.from(clientMap, ([key, value]) => ({
    clientId: key,
    clientName: value.clientName,
    serviceTime: value.serviceTime.map((time) => ({
      date: time.date,
      start: time.start,
      end: time.end,
    })),
  }));

  return result;
}
