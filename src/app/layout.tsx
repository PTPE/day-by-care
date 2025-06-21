import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import ThemeProvider from '@/providers/themeProvider/themeProvider';
import TanstakeProvider from '@/providers/tanstakeProvider/TanstakeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '日日安 DayByCare',
  description:
    '一套專為居家照護設計的排班與時數管理工具，簡單好用，提升照護工作的效率與品質。',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <TanstakeProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </TanstakeProvider>
      </body>
    </html>
  );
}
