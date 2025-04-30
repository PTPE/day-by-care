'use server';

import { createClient } from '@/utils/supabase/supabase-server';

export default async function getClientsAction() {
  const supabase = createClient();

  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('client')
    .select(
      'supervisorName, clientName, clientIcon, client_id, schedule ( schedule_id, year, month )'
    );

  if (error) throw new Error(error.message);

  return data;
}
