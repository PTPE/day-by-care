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
      <div className="px-5 lg:mx-20 lg:my-8">
        <Header />

        <main className="flex-1 mx-auto w-full mb-20 lg:mb-0">{children}</main>
      </div>

      <ThemeToggler />

      <footer className="fixed bottom-0 left-0 right-0 mt-auto lg:hidden">
        <Navigation />
      </footer>
    </div>
  );
}
