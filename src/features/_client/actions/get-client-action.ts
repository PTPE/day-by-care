'use server';

import { createClient } from '@/utils/supabase/supabase-server';
import { Client } from '@/features/client/types/client';

export default async function getClientAction(
  clientId: string
): Promise<Client> {
  const supabse = createClient();

  const { data, error } = await supabse
    .from('client')
    .select('*')
    .eq('client_id', clientId);

  const client = ({ ...data } as Client[])[0];

  if (error) throw new Error(error.message);

  return client;
}
