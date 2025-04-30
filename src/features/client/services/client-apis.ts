import { TypedSupabaseClient } from '@/utils/supabase/types';
import { Client } from '@/features/client/types';

export async function getClients(
  client: TypedSupabaseClient
): Promise<Client[]> {
  const userId = (await client.auth.getUser()).data.user?.id;

  if (!userId) {
    throw new Error('User not found');
  }

  const { data, error } = await client
    .from('client')
    .select(
      'client_id, client_name, client_icon, supervisor_name, supervisor_phone, office_phone, emergency_contact, emergency_contact_phone, address, birthday, service_item_ids'
    )
    .eq('user_id', userId)
    .throwOnError();

  if (error) {
    throw error;
  }

  return data as Client[];
}
