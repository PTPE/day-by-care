import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, '密碼長度至少8碼'),
    newPassword: z.string().min(8, '密碼長度至少8碼'),
    confirmPassword: z.string().min(8, '密碼長度至少8碼'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'],
  });
