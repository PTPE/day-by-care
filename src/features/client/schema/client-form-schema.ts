import { z } from 'zod';

import { Constants } from '@/utils/supabase/database.types';

const serviceItemEnum = z.enum(Constants.public.Enums.service_item_id);
const incomeCategoryEnum = z.enum(Constants.public.Enums.income_category);

export const clientFormSchema = z.object({
  clientIcon: z.string().optional(),
  clientName: z.string().min(1, { message: '請輸入案主姓名' }),
  birthday: z.string().min(1, { message: '請輸入生日' }),
  address: z.string().min(1, { message: '請輸入地址' }),
  supervisorName: z.string().min(1, { message: '請輸入督導姓名' }),
  supervisorPhone: z.string().min(1, { message: '請輸入督導電話' }),
  officePhone: z.string().min(1, { message: '請輸入辦公室電話' }),
  emergencyContact: z.string().min(1, { message: '請輸入緊急聯絡人' }),
  emergencyContactPhone: z.string().min(1, { message: '請輸入緊急聯絡人電話' }),
  serviceItemIds: z
    .array(serviceItemEnum)
    .min(1, { message: '請選擇服務項目' }),
  incomeCategory: incomeCategoryEnum.refine((val) => !!val, {
    message: '請選擇身份別',
  }),
  cms: z.string().min(1, { message: '請選擇 CMS 級數' }),
  isHighRisk: z.boolean({ message: '請選擇是否為重點看視對象' }),
});
