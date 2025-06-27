'use client';

import { serviceItemMap } from '@/const/service-items';
import { Client } from '@/types/client';

type Props = {
  selectedClient?: Client;
};

export default function ClientInformation({ selectedClient }: Props) {
  if (!selectedClient) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 bg-card p-4 rounded-lg lg:p-8">
      <div className="flex items-center gap-5">
        <div className="w-20 aspect-square rounded-full flex items-center justify-center p-2 shadow-[0_7px_29px_0px_rgba(100,100,111,0.2)]">
          {selectedClient.clientIcon ? (
            <div className={`${selectedClient.clientIcon} w-full h-full`} />
          ) : (
            <div className="text-2xl font-bold">
              {selectedClient.clientName[0]}
            </div>
          )}
        </div>

        <div className="text-xl font-extrabold tracking-widest">
          {selectedClient.clientName}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_4fr] gap-2 md:grid-cols-[1fr_3fr_1fr_3fr]">
        <div className="text-sm md:text-base">住址</div>
        <div className="text-sm md:text-base font-bold">
          {selectedClient.address}
        </div>

        <div className="text-sm md:text-base">電話</div>
        <div className="text-sm md:text-base font-bold">
          {selectedClient.emergencyContactPhone}
        </div>

        <div className="text-sm md:text-base">督導</div>
        <div className="text-sm md:text-base font-bold">
          {selectedClient.supervisorName}
        </div>

        <div className="text-sm md:text-base">服務項目</div>
        <div className="text-sm md:text-base font-bold">
          {selectedClient.serviceItemIds
            ?.map((id) => serviceItemMap[id])
            .join('、')}
        </div>
      </div>
    </div>
  );
}
