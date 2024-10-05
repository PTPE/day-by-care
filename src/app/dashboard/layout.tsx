import Header from './header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col m-auto">
      <Header />
      {children}
    </div>
  );
}
