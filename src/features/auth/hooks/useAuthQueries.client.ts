import { useMutation } from '@tanstack/react-query';

import {
  signIn,
  signInWithGoogle,
  signOut,
  signUp,
} from '@/features/auth/services/auth-actions';

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
