'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import signInSchema from '@/modules/signIn';

export default async function signIn(data: z.infer<typeof signInSchema>) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const isValid = signInSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!isValid.success) {
    redirect('/error');
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');

  redirect('/dashboard/clients');
}
