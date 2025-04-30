/* eslint-disable @typescript-eslint/return-await */

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import { getClients } from '@/features/client/services/client-apis';
import useSupabaseBrowser from '@/utils/supabase/supabase-browser';

export function useGetClients() {
  const supabase = useSupabaseBrowser();

  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.CLIENTS],
    queryFn: () => getClients(supabase),
  });

  return { data, isLoading, error };
}
