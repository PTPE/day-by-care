'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export default async function gmailOauth() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: 'http://localhost:3000/auth/callback' },
  });

  if (error) {
    redirect('/error');
  }

  if (data.url) {
    redirect(data.url);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
