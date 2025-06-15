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

  const defaultValues = {
    clientIcon: clientData.clientIcon,
    clientName: clientData.clientName,
    birthday: clientData.birthday,
    address: clientData.address,
    emergencyContact: clientData.emergencyContact,
    emergencyContactPhone: clientData.emergencyContactPhone,
    serviceItems: clientData.serviceItemIds,
    supervisorName: clientData.supervisorName,
    supervisorPhone: clientData.supervisorPhone,
    officePhone: clientData.officePhone,
  };

  return <ClientForm defaultValues={defaultValues} />;
}
