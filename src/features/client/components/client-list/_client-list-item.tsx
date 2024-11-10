import Button from '@/ui/button/button';

export default function ClientListItem() {
  return (
    <div className="relative min-w-[250px] flex flex-col items-center gap-2 p-4 w-fit bg-gradient-to-b border border-secondary/50 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] rounded-lg bg-secondary">
      <div className="w-20 h-20 p-3 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] rounded-full bg-secondary">
        <span className="icon-[noto--old-woman-medium-light-skin-tone] w-full h-full" />
      </div>

      <span className="font-semibold">王小明</span>

      <ul className="flex gap-2">
        <li>督導：秋月</li>
      </ul>

      <div className="flex w-full gap-3">
        <Button size="sm" variant="outline" className="flex-1">
          查看
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          製作班表
        </Button>
      </div>
    </div>
  );
}
