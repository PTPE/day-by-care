'use client';

import Header from '@/ui/header';
import Navigation from '@/ui/navigation';
import ThemeToggler from '@/ui/themeToggler';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <div className="lg:mx-20 lg:my-8">
        <Header />

        <main className="flex-1 py-10 max-w-[1190px] px-2 mx-auto w-full">
          {children}
        </main>
      </div>

      <ThemeToggler />

      <footer className="relative mt-auto lg:hidden">
        <Navigation />
      </footer>
    </div>
  );
}
