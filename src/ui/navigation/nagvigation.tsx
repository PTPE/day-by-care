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
        href={routes.Schedule()}
        icon="icon-[uil--schedule]"
        label="班表"
      />

      <NavigationItem
        href={routes.Reports()}
        icon="icon-[icon-park-outline--chart-histogram-one]"
        label="時數"
      />

      <NavigationItem
        href={routes.Setting()}
        icon="icon-[material-symbols--settings]"
        label="設定"
      />
    </div>
  );
}
