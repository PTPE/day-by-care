import { useMutation } from '@tanstack/react-query';

import signInWithGoogle from '@/features/auth/services/sign-in-with-google';

export default function useSignInWithGoogle({
  onSuccessCb,
}: { onSuccessCb?: () => void } = {}) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: onSuccessCb,
  });

  return { mutate, isPending, error };
}
