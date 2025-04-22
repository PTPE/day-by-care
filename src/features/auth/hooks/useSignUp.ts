import { useMutation } from '@tanstack/react-query';

import signUp from '@/features/auth/services/sign-up';

export default function useSignUp({
  onSuccessCb,
}: { onSuccessCb?: () => void } = {}) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onSuccess: onSuccessCb,
  });

  return { mutate, isPending, error };
}
