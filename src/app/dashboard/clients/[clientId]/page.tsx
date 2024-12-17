'use client';

import { useParams } from 'next/navigation';
import { format } from 'date-fns';

import useGetClient from '@/features/client/hooks/useGetClient';
import Badge from '@/ui/badge';
import Button from '@/ui/button';

export default function ClientPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const { data: client } = useGetClient(clientId);

  if (!client) return null;

  return (
    <div className="flex">
      <div className="relative flex flex-col m-auto gap-5">
        <Button className="absolute top-0 right-0">編輯</Button>
        <div className="w-20 h-20 p-3 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] rounded-full bg-secondary flex items-center justify-center cursor-pointer self-center">
          <span className={`${client.clientIcon} text-7xl`} />
        </div>
        <p className="self-center">{client.clientName}</p>

        <div className="space-x-5 self-center">
          <Button variant="outline" className="border-2">
            <span className="icon-[material-symbols--call]" />
            <span>撥打電話</span>
          </Button>
          <Button variant="outline" className="border-2">
            <span className="icon-[material-symbols--location-on]" />
            <span>地點</span>
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          <p className="font-extrabold">個人資訊</p>

          <div className="flex gap-2 text-sm">
            <p className=" w-18">地址：</p>
            <p>{client.address}</p>
          </div>

          <div className="flex gap-2 text-sm">
            <p className=" w-18">生日：</p>
            <p>{format(new Date(client.birthday), 'yyyy/MM/dd')}</p>
          </div>

          <p className="font-extrabold">緊急聯絡人</p>

          <div className="flex gap-2 text-sm">
            <p className="w-18">姓名：</p>
            <p>{client.emergencyContact}</p>
          </div>

          <div className="flex gap-2 text-sm">
            <p className="w-18">電話：</p>
            <p>{client.emergencyContactPhone}</p>
          </div>

          <p className="font-extrabold">服務資訊</p>

          <div className="flex gap-2 text-sm items-center">
            <p className="w-18">服務項目：</p>
            {client.serviceItems.map((item) => (
              <Badge key={item} variant="outline">
                {item}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 text-sm items-center">
            <p className="w-18">督導姓名：</p>
            <p>{client.supervisorName}</p>
          </div>
          <div className="flex gap-2 text-sm items-center">
            <p className="w-18">督導電話：</p>
            <p>{client.supervisorPhone}</p>
          </div>

          <div className="flex gap-2 text-sm items-center">
            <p className="w-18">辦公室電話：</p>
            <p>{client.officePhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
