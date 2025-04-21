import { useMutation } from '@tanstack/react-query';

import { uploadFile } from '@/features/download-schedule/actions/get-ibon-tokens';

export default function useUploadFileToIbon() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: uploadFile,
  });

  return {
    mutate,
    isPending,
    error,
  };
}
