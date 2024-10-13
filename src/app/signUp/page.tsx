'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import signUpSchema from '@/modules/signUp';
import { Google } from '@/icons/google';
import Logo from '@/ui/logo';
import signUp from '@/actions/signUp';
import gmailOauth from '@/actions/gmailOAuth';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    await signUp(data);
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <form
        className="flex flex-col gap-3 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] bg-secondaryBg w-1/3 min-w-[500px] p-10 pt-5 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-fit self-center">
          <Link href="/">
            <Logo size="md" className="self-auto" />
          </Link>
        </div>
        <h2 className="text-center font-semibold">用以下平台登入</h2>
        <div>
          <button
            type="button"
            onClick={() => gmailOauth()}
            className="px-2 py-1 flex items-center justify-center border-2 border-secondary/40 hover:bg-button-secondary-hover/10 rounded-[5px] w-full cursor-pointer"
          >
            <Google />
            Google
          </button>
        </div>

        <div className="flex flex-row items-center gap-5">
          <div className="h-[1px] bg-line grow" />
          <span className="text-sm">或</span>
          <div className="h-[1px] bg-line grow" />
        </div>

        <div className="flex gap-3">
          <div className="space-y-3">
            <label htmlFor="lastName" className="font-semibold">
              姓
            </label>
            <div>
              <input
                type="text"
                id="lastName"
                className={`px-2 py-1 border-2 ${errors.lastName ? 'border-red-500' : 'border-secondary/40'} rounded-[5px]`}
                {...register('lastName')}
              />
              <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="firstName" className="font-semibold">
              名
            </label>
            <div>
              <input
                type="text"
                id="firstName"
                className={`px-2 py-1 border-2 ${errors.firstName ? 'border-red-500' : 'border-secondary/40'} rounded-[5px]`}
                {...register('firstName')}
              />
              <p className="text-red-500 text-sm">
                {errors.firstName?.message}
              </p>
            </div>
          </div>
        </div>

        <label htmlFor="email" className="font-semibold">
          電子郵件
        </label>
        <div>
          <input
            type="email"
            id="email"
            className={`w-full px-2 py-1 border-2 ${errors.email ? 'border-red-500' : 'border-secondary/40'} rounded-[5px]`}
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
            className={`w-full px-2 py-1 border-2 ${errors.password ? 'border-red-500' : 'border-secondary/40'} rounded-[5px]`}
            {...register('password')}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <label htmlFor="confirmPassword" className="font-semibold">
          確認密碼
        </label>
        <div>
          <input
            type="password"
            id="confirmPassword"
            className={`w-full px-2 py-1 border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-secondary/40'} rounded-[5px]`}
            {...register('confirmPassword')}
          />
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          type="submit"
          className="p-2 mt-3 bg-button-primary text-button-primary hover:bg-button-primary-hover rounded-[5px]"
        >
          註冊
        </button>
      </form>
    </div>
  );
}
