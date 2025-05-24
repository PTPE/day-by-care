import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  signIn,
  signInWithGoogle,
  signOut,
  signUp,
  updateUser,
  updateUserPassword,
} from '@/features/auth/services/auth-actions';
import { QUERY_KEYS } from '@/const/QUERY_KEYS';
import { getUser } from '@/features/auth/services/auth-apis';
import useSupabaseBrowser from '@/utils/supabase/supabase-browser';

export function useSignIn({
  onSuccessCb,
}: {
  onSuccessCb?: () => void;
} = {}) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: signIn,
    onSuccess: onSuccessCb,
  });

  return { mutate, isPending, error };
}

export function useSignInWithGoogle({
  onSuccessCb,
}: {
  onSuccessCb?: () => void;
} = {}) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: onSuccessCb,
  });

  return { mutate, isPending, error };
}

export function useSignOut() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: signOut,
  });

  return { mutate, isPending, error };
}

export function useSignUp({
  onSuccessCb,
}: {
  onSuccessCb?: () => void;
} = {}) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onSuccess: onSuccessCb,
  });

  return { mutate, isPending, error };
}

export function useGetUser() {
  const supabaseClient = useSupabaseBrowser();
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () => getUser(supabaseClient),
  });

  return { data, isLoading, error };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
  });

  return { mutate, isPending, error };
}

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
  });

  return { mutate, isPending, error };
}
