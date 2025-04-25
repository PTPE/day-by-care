import Badge from '@/ui/badge';

type Props = {
  children: React.ReactNode;
  onDelete: () => void;
};

export default function Chip({ children, onDelete }: Props) {
  return (
    <Badge className="w-fit space-x-2">
      <span>{children}</span>
      <button type="button" onClick={onDelete} className="flex items-center">
        <span className="icon-[pajamas--clear]" />
      </button>
    </Badge>
  );
}
