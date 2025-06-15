'use client';

import { useState } from 'react';

import FormTypeTabs from './_form-type-tabs';
import SignIn from './_sign-in';
import SignUp from './_sign-up';

export type FormType = 'signIn' | 'signUp';

export default function AuthForm() {
  const [formType, setFormType] = useState<FormType>('signIn');

  return (
    <div className="p-10 h-full flex-col flex items-center justify-center">
      <div className="min-w-[350px] w-[65%] bg-card px-10 py-5 mb-5 rounded-lg">
        測試帳號：test@mail.com
        <br />
        測試密碼：12345678
      </div>
      <div className="min-w-[350px] w-[65%] flex flex-col items-center justify-center gap-5 bg-card rounded-lg shadow-sm p-8">
        <FormTypeTabs formType={formType} onHandleFormType={setFormType} />
        {formType === 'signIn' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}
