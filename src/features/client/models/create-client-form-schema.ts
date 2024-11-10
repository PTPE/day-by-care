import { z } from 'zod';

import { ServiceItem } from '@/features/client/types/service-items';

export const createClientFormSchema = z.object({
  clientIcon: z.string().optional(),
  name: z.string(),
  birthday: z.number().optional(),
  address: z.string(),
  supervisorName: z.string(),
  supervisorPhone: z.string(),
  officePhone: z.number().optional(),
  emergencyContact: z.string().optional(),
  emergencyContactPhone: z.number().optional(),
  serviceItems: z.array(z.nativeEnum(ServiceItem)),
});
