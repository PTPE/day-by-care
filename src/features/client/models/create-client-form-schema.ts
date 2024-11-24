import { z } from 'zod';

import { ServiceItem } from '@/features/client/types/service-items';

export const createClientFormSchema = z.object({
  clientIcon: z.string().optional(),
  clientName: z.string().min(1, { message: '請輸入案主姓名' }),
  birthday: z.string().min(1, { message: '請輸入案主生日' }),
  address: z.string().min(1, { message: '請輸入地址' }),
  supervisorName: z.string().min(1, { message: '請輸入督導姓名' }),
  supervisorPhone: z.string().min(1, { message: '請輸入督導電話' }),
  officePhone: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  serviceItems: z.array(z.nativeEnum(ServiceItem)).nonempty(),
});
