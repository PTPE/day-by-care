import { FormType } from '@/features/auth/components/auth-form/auth-form';

type Props = {
  formType: FormType;
  onHandleFormType: (formType: FormType) => void;
};
export default function FormTypeTabs({ formType, onHandleFormType }: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative bottom-[-1px] w-full flex justify-center md:justify-start">
        <button
          type="button"
          className={`transition-all duration-300 flex-shrink-0 px-8 py-2 border-b-2 text-lg font-bold ${formType === 'signIn' ? 'text-primary border-b-2 border-primary' : 'border-transparent'}`}
          onClick={() => onHandleFormType('signIn')}
        >
          登入
        </button>
        <button
          type="button"
          className={`transition-all duration-300 flex-shrink-0 px-8 py-2 border-b-2 text-lg font-bold ${formType === 'signUp' ? 'text-primary border-b-2 border-primary' : 'border-transparent'}`}
          onClick={() => onHandleFormType('signUp')}
        >
          註冊
        </button>
      </div>
      <div className="bg-line w-full h-[1px]" />
    </div>
  );
}
