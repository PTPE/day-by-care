import { Client } from '@/types/client';
import { TypedSupabaseClient } from '@/utils/supabase/types';

// type GetClientListParams = {
//   serviceTimeStart: string;
//   serviceTimeEnd: string;
//   supabaseClient: TypedSupabaseClient;
// };

// type ResGetClientList = ClientList;

// export async function getClientList({
//   serviceTimeStart,
//   serviceTimeEnd,
//   supabaseClient,
// }: GetClientListParams): Promise<ResGetClientList> {
//   const { data, error } = await supabaseClient
//     .from('schedule')
//     .select('client_id, client(client_name, client_icon)')
//     .gte('date', serviceTimeStart)
//     .lte('date', serviceTimeEnd);

//   if (error) throw new Error(error.message);

//   const clientList = data?.map((client) => ({
//     clientId: client.client_id,
//     clientName: client.client?.client_name || '',
//     clientIcon: client.client?.client_icon || '',
//   }));

//   return clientList;
// }

type GetClientParams = {
  serviceTimeStart: string;
  serviceTimeEnd: string;
  supabaseClient: TypedSupabaseClient;
};

export async function getClients({
  serviceTimeStart,
  serviceTimeEnd,
  supabaseClient,
}: GetClientParams): Promise<Client[]> {
  const { data, error } = await supabaseClient
    .from('schedule')
    .select(
      'client_id, client(client_name, client_icon, address, emergency_contact_phone, supervisor_name, service_item_ids)'
    )
    .gte('date', serviceTimeStart)
    .lte('date', serviceTimeEnd);

  if (error) throw new Error(error.message);

  const formattedData = data?.map((client) => ({
    [client.client_id]: {
      clientName: client.client?.client_name || '',
      clientIcon: client.client?.client_icon || '',
      address: client.client?.address || '',
      emergencyContactPhone: client.client?.emergency_contact_phone || '',
      supervisorName: client.client?.supervisor_name || '',
      serviceItemIds: client.client?.service_item_ids || [],
    },
  }));

  return formattedData;
}

type GetClientServiceTimeParams = {};

type ResGetClientServiceTime = {};

export async function getClientsServiceTime() {}
