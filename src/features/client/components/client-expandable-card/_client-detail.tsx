import { Label } from '@/ui/label/label';

export default function ClientDetail() {
  return (
    <div className="grid grid-cols-2 gap-2 grid-auto-rows-[minmax(2.5rem,auto)] md:gap-y-3">
      <Label className="flex items-baseline gap-2 flex-shrink-0">
        <span className="icon-[material-symbols--location-on] text-accent " />
        地址
      </Label>
      <div className="flex items-center">
        台北市中正區台北市中正區台北市中正區
      </div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[icon-park-twotone--birthday-cake] text-accent" />
        出生年月日
      </Label>
      <div className="flex items-center">1950年1月1日</div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[material-symbols--circle-notifications] text-accent" />
        緊急聯絡人
      </Label>
      <div className="flex items-center">王小明</div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[material-symbols--call] text-accent" />
        緊急聯絡人電話
      </Label>
      <div className="flex items-center">090-1234-5678</div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[mdi--account-tie] text-accent" />
        督導
      </Label>
      <div className="flex items-center">王秋月</div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[material-symbols--call] text-accent" />
        督導電話
      </Label>
      <div className="flex items-center">090-1234-5678</div>
    </div>
  );
}
