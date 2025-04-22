import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email({ message: '請輸入有效的電子郵件' }),
  password: z.string().min(8, { message: '密碼至少 8 個字元' }),
});

export default signInSchema;
