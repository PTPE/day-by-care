import AppIntro from '@/features/auth/components/app-intro/';
import AuthForm from '@/features/auth/components/auth-form';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-full bg-primary">
      <div className="flex-1 min-w-0">
        <AppIntro />
      </div>

      <div className="flex-1 min-w-0">
        <AuthForm />
      </div>
    </div>
  );
}
