import Header from './header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col pt-2 m-auto max-w-[1190px]">
      <Header />
      {children}
    </div>
  );
}
