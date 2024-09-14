import ThemeToggler from '@/_components/themeToggler';
import Logo from '@/_ui/logo';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Logo size="sm" />
      <ThemeToggler />
    </div>
  );
}
