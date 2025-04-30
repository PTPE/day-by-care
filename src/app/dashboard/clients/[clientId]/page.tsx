import { cookies } from 'next/headers';

import ClientForm from '@/features/client/components/client-form';
import { getClient } from '@/features/client/services/client-apis';
import useSupabaseServer from '@/utils/supabase/supabase-server';

export default async function ClientPage({
  params,
}: {
  params: { clientId: string };
}) {
  const { clientId } = params;

  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const clientData = await getClient(supabase, { clientId });

  const defaultValues = {
    clientIcon: clientData.client_icon,
    clientName: clientData.client_name,
    birthday: clientData.birthday,
    address: clientData.address,
    emergencyContact: clientData.emergency_contact,
    emergencyContactPhone: clientData.emergency_contact_phone,
    serviceItems: clientData.service_item_ids,
    supervisorName: clientData.supervisor_name,
    supervisorPhone: clientData.supervisor_phone,
    officePhone: clientData.office_phone,
  };

  return <ClientForm defaultValues={defaultValues} />;
}
