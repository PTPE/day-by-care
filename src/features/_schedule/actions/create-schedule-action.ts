'use server';

import { createClient } from '@/utils/supabase/server';

export type ParamsCreateSchedule = {
  client_id: string;
  month: number;
  timeSlots: {
    start: string;
    end: string;
  }[];
  year: number;
};

export default async function createScheduleAction(
  formData: ParamsCreateSchedule
) {
  const supabase = createClient();

  // 直接使用 timeSlots 資料，不需要轉換為 JSON 字符串
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { client_id, year, month, timeSlots } = formData;

  // 調用 RPC 並將 timeSlots 傳遞為 JSONB 類型
  const { data, error } = await supabase.rpc('insert_or_update_schedule', {
    p_client_id: client_id,
    p_year: year,
    p_month: month,
    p_time_slots: timeSlots,
  });

  if (error) {
    return { message: error };
  }

  return { data };
}
