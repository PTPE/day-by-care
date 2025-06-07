import { Client, Schedule } from '@/types/client';
import { TypedSupabaseClient } from '@/utils/supabase/types';

export type GetClientsParams = {
  clientIds?: string[];
  startDate?: string;
  endDate?: string;
};

export async function getClients(
  supabaseClient: TypedSupabaseClient,
  params: GetClientsParams
): Promise<Client[]> {
  const { startDate, endDate, clientIds } = params;
  let query = supabaseClient
    .from('schedule')
    .select(
      'client_id, client(client_name, client_icon, address, emergency_contact_phone, supervisor_name, service_item_ids)'
    );

  if (startDate) {
    query = query.gte('date', startDate);
  }

  if (endDate) {
    query = query.lte('date', endDate);
  }

  if (clientIds && clientIds.length > 0) {
    query = query.in('client_id', clientIds);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  const clientMap = new Map<string, Client>();

  data?.forEach((item) => {
    const { client } = item;
    const clientId = item.client_id;

    if (!client || !clientId) return;

    if (!clientMap.has(clientId)) {
      clientMap.set(clientId, {
        clientId,
        clientName: client.client_name,
        clientIcon: client.client_icon ?? '',
        address: client.address ?? null,
        emergencyContactPhone: client.emergency_contact_phone ?? null,
        supervisorName: client.supervisor_name ?? null,
        serviceItemIds: client.service_item_ids ?? [],
      });
    }
  });

  return Array.from(clientMap.values());
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
