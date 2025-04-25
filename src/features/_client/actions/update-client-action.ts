'use server';

import { z } from 'zod';

import { createClientFormSchema } from '@/features/client/models/create-client-form-schema';
import { createClient } from '@/utils/supabase/server';

type ParamsUpdateClient = {
  formData: z.infer<typeof createClientFormSchema>;
  client_id: string;
};

export async function updateClientAction({
  formData,
  client_id,
}: ParamsUpdateClient) {
  const supabase = createClient();

  const { error: parseError } = createClientFormSchema.safeParse(formData);

  if (parseError) {
    return { message: parseError };
  }

  const { data: supabaseData, error: supabaseError } = await supabase
    .from('client')
    .update([formData])
    .eq('client_id', client_id)
    .select();

  if (supabaseError) return { message: supabaseError };

  return { data: supabaseData };
}
