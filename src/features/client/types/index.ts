import { Constants } from '@/utils/supabase/database.types';

export type ServiceItemId =
  (typeof Constants.public.Enums.service_item_id)[number];

export type Client = {
  address: string;
  birthday: string;
  client_icon: string;
  client_id: string;
  client_name: string;
  created_at: string;
  emergency_contact: string;
  emergency_contact_phone: string;
  office_phone: string;
  service_item_ids: ServiceItemId[];
  supervisor_name: string;
  supervisor_phone: string;
};
