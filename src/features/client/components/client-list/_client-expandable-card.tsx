import Button from '@/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/ui/collapsible';
import { Client } from '@/features/client/types';

import ClientDetail from './_client-detail';

type Props = {
  client: Client;
};

export default function ClientExpandableCard({ client }: Props) {
  const clientDetail = {
    address: client.address,
    birthday: client.birthday,
    emergency_contact: client.emergency_contact,
    emergency_contact_phone: client.emergency_contact_phone,
    supervisor_name: client.supervisor_name,
    supervisor_phone: client.supervisor_phone,
    office_phone: client.office_phone,
  };

  return (
    <div className="flex flex-col gap-3 bg-card p-4 rounded-lg lg:p-8">
      <div className="flex items-center gap-3">
        <div className="w-16 aspect-square rounded-full flex items-center justify-center p-2 shadow-[0_7px_29px_0px_rgba(100,100,111,0.2)]">
          {client.client_icon ? (
            <div className={`${client.client_icon} w-full h-full`} />
          ) : (
            <div className="text-2xl font-bold">{client.client_name[0]}</div>
          )}
        </div>

        <div>
          <div className="text-xl font-extrabold tracking-widest">
            {client.client_name}
          </div>

          <div className="flex items-center gap-2">
            <span className="icon-[material-symbols--call]" />
            <div>{client.emergency_contact_phone}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-1 text-tertiary-foreground text-sm md:text-base flex-wrap">
        <div className="bg-secondary rounded-full px-2 py-1 ">居家服務</div>
        <div className="bg-secondary rounded-full px-2 py-1">日間照顧</div>
        <div className="bg-secondary rounded-full px-2 py-1">短期照顧</div>
        <div className="bg-secondary rounded-full px-2 py-1 ">居家服務</div>
        <div className="bg-secondary rounded-full px-2 py-1">日間照顧</div>
        <div className="bg-secondary rounded-full px-2 py-1">短期照顧</div>
      </div>

      <div className="hidden md:block md:mt-2">
        <ClientDetail clientDetail={clientDetail} />
        <Button
          className="col-span-2 border-accent text-accent w-full mt-4"
          variant="outline"
        >
          <div className="icon-[material-symbols-light--edit-square-rounded]" />
          編輯
        </Button>
      </div>

      <div className="w-full h-[1px] bg-line mt-2 md:hidden" />

      <Collapsible className="md:hidden">
        <CollapsibleTrigger className="w-full mb-1">
          <div className="flex items-center justify-between">
            <div className="font-bold text-sm">案主詳細資料</div>
            <div className="icon-[material-symbols--expand-circle-down] w-6 h-6 text-accent text-center" />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="tracking-wide flex flex-col gap-2 text-sm">
            <ClientDetail clientDetail={clientDetail} />

            <Button
              className="col-span-2 border-accent text-accent"
              variant="outline"
            >
              <div className="icon-[material-symbols-light--edit-square-rounded]" />
              編輯
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
