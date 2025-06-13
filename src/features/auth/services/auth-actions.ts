'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';

import signUpSchema from '@/modules/signUp';
import signInSchema from '@/modules/signIn';
import useSupabaseServer from '@/utils/supabase/supabase-server';

export async function signUp(data: z.infer<typeof signUpSchema>) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabaseClient = useSupabaseServer(cookies());

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

  const { error } = await supabaseClient.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: 'api/auth/callback',
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    },
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export type SignInParams = z.infer<typeof signInSchema>;

export async function signIn(data: SignInParams) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabaseClient = useSupabaseServer(cookies());

  const isValid = signInSchema.safeParse({
    email: data.email,
    password: data.password,
  });

  if (!isValid.success) {
    redirect('/error');
  }

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');

  redirect('/dashboard');
}

export async function signInWithGoogle() {
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabaseClient = useSupabaseServer(cookies());

  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${protocol}://${host}/api/auth/callback` },
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

export async function signOut() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabaseClient = useSupabaseServer(cookies());

  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');

  redirect('/');
}

export async function updateUser(data: {
  password?: string;
  firstName?: string;
  lastName?: string;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabaseClient = useSupabaseServer(cookies());

  const { error } = await supabaseClient.auth.updateUser({
    data,
  });

  if (error) {
    throw new Error(error.message);
  }
}

type UpdateUserPasswordParams = {
  currentPassword: string;
  newPassword: string;
};

export async function updateUserPassword(params: UpdateUserPasswordParams) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabaseClient = useSupabaseServer(cookies());

  const { data: user } = await supabaseClient.auth.getUser();
  const userId = user.user?.id;

  if (!userId) {
    throw new Error('User not found');
  }

  const { data, error } = await supabaseClient.rpc('change_password', {
    current_password: params.currentPassword,
    new_password: params.newPassword,
    user_id: userId,
  });

  if (error || data === 'incorrect') {
    throw new Error('password is incorrect');
  }
}
