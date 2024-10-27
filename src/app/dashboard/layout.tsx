'use client';

import Header from '@/ui/header';
import signOut from '@/actions/signOut';
import Button from '@/ui/button/button';
import NavigationItem from '@/ui/navigation-item';
import routes from '@/const/routes';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col m-auto">
      <Header
        endChildren={
          <ul className="flex gap-1">
            <NavigationItem href={routes.Clients()} size="sm">
              案主列表
            </NavigationItem>

            <NavigationItem href={routes.NewClients()} size="sm">
              新增案主
            </NavigationItem>

            <NavigationItem href={routes.Reports()} size="sm">
              月結總表
            </NavigationItem>

            <Button onClick={async () => signOut()}>登出</Button>
          </ul>
        }
      />

      <div className="py-10 max-w-[1190px] px-2 mx-auto w-full">{children}</div>
    </div>
  );
}
