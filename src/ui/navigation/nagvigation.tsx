import routes from '@/const/routes';

import NavigationItem from './_navigation-item';

export default function Navigation() {
  return (
    <div className="w-full flex rounded-3xl items-center bg-primary justify-around lg:gap-10 p-2">
      <NavigationItem
        href={routes.Dashboard()}
        icon="icon-[mingcute--home-3-fill]"
        label="首頁"
      />

      <NavigationItem
        href={routes.Clients()}
        icon="icon-[fa6-solid--people-group]"
        label="案主"
      />

      <NavigationItem
        href={routes.Reports()}
        icon="icon-[mingcute--calendar-fill]"
        label="時數"
      />

      <NavigationItem
        href={routes.Settings()}
        icon="icon-[material-symbols--settings]"
        label="設定"
      />
    </div>
  );
}
