import { cookies } from 'next/headers';

import ClientForm from '@/features/client/components/client-form';
import useSupabaseServer from '@/utils/supabase/supabase-server';
import { getClients } from '@/services/apis';

export default async function ClientPage({
  params,
}: {
  params: { clientId: string };
}) {
  const { clientId } = params;

  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const clientData = (await getClients(supabase, { clientIds: [clientId] }))[0];

  return <ClientForm defaultValues={clientData} />;
}
