'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import signInSchema from '@/modules/signIn';

export default async function signUp(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const isValid = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!isValid.success) {
    redirect('/error');
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: isValid.data.email,
    password: isValid.data.password,
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
