import Link from 'next/link';
import ThemeToggler from 'src/themeToggler';
import Logo from 'src/ui/logo';

export default function Header() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Logo size="md" className="cursor-pointer" />
        </Link>

        <div className="flex items-center gap-2">
          <Link href="signIn">
            <button
              type="button"
              className="border-2 px-3 py-1 text-primary border-primary rounded-lg"
            >
              登入
            </button>
          </Link>

          <Link href="signUp">
            <button
              type="button"
              className="border-2 border-transparent bg-button-primary text-button-primary hover:bg-button-primary-hover hover:border-transparent px-3 py-1 rounded-lg"
            >
              註冊
            </button>
          </Link>
          <ThemeToggler />
        </div>
      </div>
      <div className="w-full h-[1px] bg-line" />
    </div>
  );
}
