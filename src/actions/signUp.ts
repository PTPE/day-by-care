'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/supabase-server';
import signUpSchema from '@/modules/signUp';

export default async function SignUp(data: z.infer<typeof signUpSchema>) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const isValid = signUpSchema.safeParse({
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    firstName: data.firstName,
    lastName: data.lastName,
  });

  if (!isValid.success) {
    redirect('/error');
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
