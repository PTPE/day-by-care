import { z } from 'zod';

const signUpSchema = z
  .object({
    lastName: z.string().min(1, { message: '必填' }),
    firstName: z.string().min(1, { message: '必填' }),
    email: z.string().email({ message: '請輸入有效的電子郵件' }),
    password: z.string().min(8, { message: '密碼至少 8 個字元' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'],
  });

export default signUpSchema;
