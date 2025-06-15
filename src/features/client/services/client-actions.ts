/* eslint-disable react-hooks/rules-of-hooks */

'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';

import { clientFormSchema } from '@/features/client/schema/client-form-schema';
import useSupabaseServer from '@/utils/supabase/supabase-server';

export async function createClient(formData: z.infer<typeof clientFormSchema>) {
  const cookieStore = cookies();

  const client = useSupabaseServer(cookieStore);

  const { error } = await client.from('client').insert({
    client_name: formData.clientName,
    client_icon: formData.clientIcon,
    birthday: formData.birthday,
    address: formData.address,
    emergency_contact: formData.emergencyContact,
    emergency_contact_phone: formData.emergencyContactPhone,
    service_item_ids: formData.serviceItems,
    supervisor_name: formData.supervisorName,
    supervisor_phone: formData.supervisorPhone,
    office_phone: formData.officePhone,
  });

  if (error) {
    throw new Error(error.message);
  }
}

type UpdateClientParams = {
  clientId: string;
  formData: z.infer<typeof clientFormSchema>;
};

export async function updateClient({ clientId, formData }: UpdateClientParams) {
  const cookieStore = cookies();

  const client = useSupabaseServer(cookieStore);

  const { error } = await client
    .from('client')
    .update({
      client_name: formData.clientName,
      client_icon: formData.clientIcon,
      birthday: formData.birthday,
      address: formData.address,
      emergency_contact: formData.emergencyContact,
      emergency_contact_phone: formData.emergencyContactPhone,
      service_item_ids: formData.serviceItems,
      supervisor_name: formData.supervisorName,
      supervisor_phone: formData.supervisorPhone,
      office_phone: formData.officePhone,
    })
    .eq('client_id', clientId)
    .throwOnError();

  if (error) {
    throw new Error(error.message);
  }
}
