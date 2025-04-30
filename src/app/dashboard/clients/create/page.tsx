import { z } from 'zod';

import ClientForm from '@/features/client/components/client-form';
import { clientFormSchema } from '@/features/client/modules';

const defaultValues = {
  clientIcon: '',
  clientName: '',
  birthday: new Date().toISOString(),
  address: '',
  emergencyContact: '',
  emergencyContactPhone: '',
  serviceItems: [],
  supervisorName: '',
  supervisorPhone: '',
  officePhone: '',
} as z.infer<typeof clientFormSchema>;

export default function CreateClientPage() {
  return <ClientForm defaultValues={defaultValues} />;
}
