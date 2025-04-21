import { useMutation } from '@tanstack/react-query';

import { uploadFileToIbonAndSendNotifyEmail } from '@/features/download-schedule/actions/get-ibon-tokens';

export default function useUploadFileToIbonAndSendNotifyEmail({
  onSuccessCb,
}: {
  onSuccessCb?: (data: { pincode: string; deadline: string }) => void;
} = {}) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: uploadFileToIbonAndSendNotifyEmail,
    onSuccess: (data) => {
      onSuccessCb?.(data);
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}
