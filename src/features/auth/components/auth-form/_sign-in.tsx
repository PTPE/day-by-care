import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/ui/button';
import Input from '@/ui/input';
import Label from '@/ui/label';
import signInSchema from '@/features/auth/modules/sign-in';
import useSignIn from '@/features/auth/hooks/useSignIn';
import useSignInWithGoogle from '@/features/auth/hooks/useSignInWithGoogle';
import LoadingSpinner from '@/ui/loading-spinner';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const { mutate: signIn, isPending: isSigningIn } = useSignIn({
    onSuccessCb: () => {
      reset();
    },
  });

  const { mutate: signInWithGoogle, isPending: isSigningInWithGoogle } =
    useSignInWithGoogle();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => signIn(data);

  return (
    <>
      {(isSigningIn || isSigningInWithGoogle) && <LoadingSpinner />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5 w-full"
      >
        <div className="w-full flex flex-col gap-2">
          <Label>帳號</Label>
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

        <Button type="submit" className="w-full py-5">
          登入
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

        <Button type="button" variant="link" className="text-sm">
          忘記密碼
        </Button>
      </form>
    </>
  );
}
