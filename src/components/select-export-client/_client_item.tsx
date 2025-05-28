import Checkbox from '@/ui/checkbox';
import Label from '@/ui/label';

type Props = {
  clientId: string;
  clientName: string;
};

export default function ClientItem({ clientId, clientName }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={clientId} />
      <Label htmlFor={clientId}>{clientName}</Label>
    </div>
  );
}
