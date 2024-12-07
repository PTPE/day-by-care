import Button from '@/ui/button/button';
import { ClientPreview } from '@/features/client/types/client';

type Props = {
  client: ClientPreview;
};

export default function ClientListItem({ client }: Props) {
  return (
    <div className="relative min-w-[250px] flex flex-col items-center gap-2 p-4 w-fit bg-gradient-to-b border border-secondary/50 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] rounded-lg bg-secondary">
      <div className="w-20 h-20 p-3 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] rounded-full bg-secondary">
        <span className={`${client.clientIcon} w-full h-full`} />
      </div>

      <span className="font-semibold">{client.clientName}</span>

      <ul className="flex gap-2">
        <li>督導：{client.supervisorName}</li>
      </ul>

      <div className="flex w-full gap-3">
        <Button variant="outline" className="flex-1">
          查看
        </Button>
        <Button variant="outline" className="flex-1">
          製作班表
        </Button>
      </div>
    </div>
  );
}
