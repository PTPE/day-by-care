'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Google } from '@/icons/google';
import signInSchema from '@/modules/signIn';
import Logo from '@/ui/logo';
import signIn from '@/actions/signIn';
import gmailOauth from '@/actions/gmailOAuth';
import Button from '@/ui/button/button';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => signIn(data);

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <form
        className="flex flex-col gap-3 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] bg-secondary w-1/3 w-min-[500px] p-10 pt-5 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-fit self-center">
          <Link href="/">
            <Logo size="md" className="self-auto" />
          </Link>
        </div>

        <label htmlFor="email" className="font-semibold">
          電子郵件
        </label>
        <div>
          <input
            type="email"
            id="email"
            className={`w-full px-2 py-1 border-2 ${errors.email ? 'border-red-500' : 'border-secondary/40'}  rounded-[5px]`}
            {...register('email')}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <label htmlFor="password" className="font-semibold">
          密碼
        </label>
        <div>
          <input
            type="password"
            id="password"
            className={`w-full px-2 py-1 border-2 ${errors.password ? 'border-red-500' : 'border-secondary/40'}  rounded-[5px]`}
            {...register('password')}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <Button className="rounded-[5px]">登入</Button>

        <div className="flex flex-row items-center gap-5">
          <div className="h-[1px] bg-line grow" />
          <span className="text-sm">或</span>
          <div className="h-[1px] bg-line grow" />
        </div>

        <div>
          <Button
            color="secondary"
            variant="outline"
            className="w-full rounded-[5px]"
            onClick={() => gmailOauth()}
          >
            <div className="flex items-center justify-center gap-2 text">
              <Google />
              Google
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}
