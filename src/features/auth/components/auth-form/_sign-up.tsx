import { useRef } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import signUpSchema from '@/features/auth/modules/sign-up';
import Label from '@/ui/label';
import Input from '@/ui/input';
import Button from '@/ui/button';
import SignUpNotificationDialog, {
  SignUpNotificationDialogRef,
} from '@/features/auth/components/sign-up-notification-dialog';
import {
  useSignInWithGoogle,
  useSignUp,
} from '@/features/auth/hooks/useAuthQueries.client';
import LoadingSpinner from '@/ui/loading-spinner';

export default function SignUp() {
  const signUpNotificationDialogRef = useRef<SignUpNotificationDialogRef>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '宇婕',
      lastName: '李',
      email: 'winnie10430@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
    },
  });

  const { mutate: signUp, isPending: isSigningUp } = useSignUp({
    onSuccessCb: () => {
      signUpNotificationDialogRef.current?.open();
      reset();
    },
  });

  const { mutate: signInWithGoogle, isPending: isSigningInWithGoogle } =
    useSignInWithGoogle({
      onSuccessCb: () => {
        reset();
      },
    });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    signUp(data);
  };

  return (
    <>
      {(isSigningUp || isSigningInWithGoogle) && <LoadingSpinner />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5 w-full"
      >
        <div className="w-full flex flex-row gap-2">
          <div className="w-full flex flex-col gap-2">
            <Label>姓</Label>
            <Input className="py-5" {...register('lastName')} />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label>名</Label>
            <Input className="py-5" {...register('firstName')} />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Label>Email</Label>
          <Input className="py-5" {...register('email')} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-2">
          <Label>密碼</Label>
          <Input className="py-5" {...register('password')} type="password" />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <Label>確認密碼</Label>
        <Input
          className="py-5"
          {...register('confirmPassword')}
          type="password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}

        <Button type="submit" className="w-full py-5">
          註冊
        </Button>

        <div className="w-full flex items-center justify-center gap-2">
          <div className="bg-line w-full h-[1px]" />
          <span>或</span>
          <div className="bg-line w-full h-[1px]" />
        </div>

        <Button
          type="button"
          className="w-full py-5"
          variant="secondary"
          onClick={() => signInWithGoogle()}
        >
          Google 登入
        </Button>
      </form>

      <SignUpNotificationDialog ref={signUpNotificationDialogRef} />
    </>
  );
}
