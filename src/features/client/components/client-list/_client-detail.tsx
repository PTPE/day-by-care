import { Client } from '@/types/client';
import { Label } from '@/ui/label/label';

type Props = {
  clientDetail: Pick<
    Client,
    | 'address'
    | 'birthday'
    | 'emergencyContact'
    | 'emergencyContactPhone'
    | 'supervisorName'
    | 'supervisorPhone'
    | 'officePhone'
  >;
};

export default function ClientDetail({ clientDetail }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 grid-auto-rows-[minmax(2.5rem,auto)] md:gap-y-3">
      <Label className="flex items-baseline gap-2 flex-shrink-0">
        <span className="icon-[material-symbols--location-on] text-accent " />
        地址
      </Label>
      <div className="flex items-center">{clientDetail.address}</div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[icon-park-twotone--birthday-cake] text-accent" />
        出生年月日
      </Label>
      <div className="flex items-center">
        {new Date(clientDetail.birthday).toLocaleDateString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[material-symbols--circle-notifications] text-accent" />
        緊急聯絡人
      </Label>
      <div className="flex items-center">{clientDetail.emergencyContact}</div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[material-symbols--call] text-accent" />
        緊急聯絡人電話
      </Label>
      <div className="flex items-center">
        {clientDetail.emergencyContactPhone}
      </div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[mdi--account-tie] text-accent" />
        督導
      </Label>
      <div className="flex items-center">{clientDetail.supervisorName}</div>

      <Label className="flex items-center gap-2 flex-shrink-0">
        <span className="icon-[material-symbols--call] text-accent" />
        督導電話
      </Label>
      <div className="flex items-center">{clientDetail.supervisorPhone}</div>
    </div>
  );
}
