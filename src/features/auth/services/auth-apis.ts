import { TypedSupabaseClient } from '@/utils/supabase/types';

export async function getUser(
  supabaseClient: TypedSupabaseClient
): Promise<{ firstName: string; lastName: string; email: string }> {
  const { data, error } = await supabaseClient.auth.getUser();

  const firstName = data.user?.user_metadata.firstName ?? '';
  const lastName = data.user?.user_metadata.lastName ?? '';
  const email = data.user?.email ?? '';

  if (error) {
    throw error;
  }

  return { firstName, lastName, email };
}
