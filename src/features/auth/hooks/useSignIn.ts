import { useMutation } from '@tanstack/react-query';

import signIn from '@/features/auth/services/sign-in';

export default function useSignIn({
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
