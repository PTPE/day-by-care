/* eslint-disable @typescript-eslint/return-await */

import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import useSupabaseServer from '@/utils/supabase/supabase-server';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import {
  getClients,
  GetClientsParams,
  getSchedules,
  GetSchedulesParams,
} from '@/services/apis';

const queryClient = new QueryClient();

export function usePrefetchClients(params: GetClientsParams = {}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const prefetchClients = async () =>
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.CLIENTS, params],
      queryFn: () => getClients(supabase, params),
    });

  return { prefetchClients };
}

export function usePrefetchSchedules(params: GetSchedulesParams = {}) {
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  const prefetchSchedules = async () =>
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.SCHEDULES, params],
      queryFn: () => getSchedules(supabase, params),
    });

  return { prefetchSchedules };
}

export { queryClient };
