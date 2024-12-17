'use server';

import { createClient } from '@/utils/supabase/server';
import { ClientPreview } from '@/features/client/types/client';

export default async function getClientsAction(): Promise<ClientPreview[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('client')
    .select('supervisorName, clientName, clientIcon, id');

  if (error) throw new Error(error.message);

  return data as ClientPreview[];
}
