import { z } from 'zod';

import ClientForm from '@/features/client/components/client-form';
import { clientFormSchema } from '@/features/client/schema/client-form-schema';

const defaultValues = {
  clientIcon: '',
  clientName: '',
  birthday: new Date().toISOString(),
  address: '',
  emergencyContact: '',
  emergencyContactPhone: '',
  serviceItemIds: [],
  supervisorName: '',
  supervisorPhone: '',
  officePhone: '',
  isHighRisk: false,
  cms: '',
  incomeCategory: 'low',
} as z.infer<typeof clientFormSchema>;

export default function CreateClientPage() {
  return <ClientForm defaultValues={defaultValues} />;
}
