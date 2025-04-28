import Badge from '@/ui/badge';

type Props = {
  children: React.ReactNode;
  onDelete: () => void;
};

export default function ServiceChip({ children, onDelete }: Props) {
  return (
    <Badge className="w-fit space-x-2 bg-tertiary text-muted-foreground px-3 py-1.5 border-border border text-sm rounded-md">
      <span>{children}</span>
      <button type="button" onClick={onDelete} className="flex items-center">
        {/* <span className="icon-[pajamas--clear]" /> */}
        <span className="icon-[maki--cross] w-3 h-3" />
      </button>
    </Badge>
  );
}
