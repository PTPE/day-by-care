'use client';

import { serviceItems } from '@/const/service-items';
import { ClientsInfo } from '@/features/dashboard/types';

type ClientInformationProps = {
  clientsInfo: ClientsInfo;
  selectedClientId: string;
};

export default function ClientInformation({
  clientsInfo,
  selectedClientId,
}: ClientInformationProps) {
  const selectedClientInfo = clientsInfo[selectedClientId];

  if (!selectedClientInfo) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 bg-card p-4 rounded-lg lg:p-8">
      <div className="flex items-center gap-5">
        <div className="w-20 aspect-square rounded-full flex items-center justify-center p-2 shadow-[0_7px_29px_0px_rgba(100,100,111,0.2)]">
          <div className={`${selectedClientInfo.clientIcon} w-full h-full`} />
        </div>

        <div className="text-xl font-extrabold tracking-widest">
          {selectedClientInfo.clientName}
        </div>
      </div>

      <div className="grid grid-cols-[1fr_4fr] gap-2 md:grid-cols-[1fr_3fr_1fr_3fr]">
        <div className="text-sm md:text-base">住址</div>
        <div className="text-sm md:text-base font-bold">
          {selectedClientInfo.address}
        </div>

        <div className="text-sm md:text-base">電話</div>
        <div className="text-sm md:text-base font-bold">
          {selectedClientInfo.emergencyContactPhone}
        </div>

        <div className="text-sm md:text-base">督導</div>
        <div className="text-sm md:text-base font-bold">
          {selectedClientInfo.supervisorName}
        </div>

        <div className="text-sm md:text-base">服務項目</div>
        <div className="text-sm md:text-base font-bold">
          {selectedClientInfo.serviceItemIds
            ?.map(
              (item) =>
                serviceItems.find((serviceItem) => serviceItem.id === item)
                  ?.name
            )
            .join('、')}
        </div>
      </div>
    </div>
  );
}
