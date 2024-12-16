import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { icons } from '@/features/client/const/client-icons';

type Props = {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
};

export default function ClientIconSelector({
  selectedIcon,
  onSelectIcon,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger className="flex flex-col items-center justify-center gap-5">
        {selectedIcon && (
          <div className="w-20 h-20 p-3 shadow-[0_5px_15px_0px_rgba(17,17,26,0.1)] rounded-full bg-secondary flex items-center justify-center cursor-pointer">
            <span className={`${selectedIcon} cursor-pointer text-5xl`} />
          </div>
        )}
        <div className="h-9 px-4 py-2 inline-flex items-center justify-center gap-2 rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-secondary-button/30">
          {selectedIcon ? '變更案主頭像' : '請選擇案主頭像'}
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-5">請選擇案主頭像</DialogTitle>
          <DialogDescription>
            <DialogClose asChild>
              <div className="flex flex-wrap gap-6">
                {icons.map((icon) => (
                  <button
                    type="button"
                    key={icon}
                    className={`${icon} cursor-pointer text-3xl`}
                    onClick={() => onSelectIcon(icon)}
                    aria-label={`Select ${icon}`}
                  />
                ))}
              </div>
            </DialogClose>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
