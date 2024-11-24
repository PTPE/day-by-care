'use server';

import { z } from 'zod';

import { createClientFormSchema } from '@/features/client/models/create-client-form-schema';
import { createClient } from '@/utils/supabase/server';

export async function createClientAction(
  formData: z.infer<typeof createClientFormSchema>
) {
  const supabase = createClient();

  const { error: parseError } = createClientFormSchema.safeParse(formData);

  if (parseError) {
    return { message: parseError };
  }

  const { data: supabaseData, error: supabaseError } = await supabase
    .from('client')
    .insert([formData])
    .select();

  if (supabaseError) return { message: supabaseError };

  return { data: supabaseData };
}
