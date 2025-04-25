'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import { serviceItems } from '@/features/client/const/service-item';
import Checkbox from '@/ui/checkbox';
import Label from '@/ui/label';
import { ServiceItem } from '@/features/client/types/service-items';

import Chip from './_chip';

type Props = {
  selectedServiceItems: ServiceItem[];
  onHandleSelectedServiceItems: (items: ServiceItem[]) => void;
};

export default function ServiceItemSelector({
  selectedServiceItems,
  onHandleSelectedServiceItems,
}: Props) {
  const handleSelectedServiceItems = (item: ServiceItem) => {
    if (selectedServiceItems.includes(item)) {
      onHandleSelectedServiceItems(
        selectedServiceItems.filter((i) => i !== item)
      );
    } else {
      onHandleSelectedServiceItems([...selectedServiceItems, item]);
    }
  };

  return (
    <Dialog>
      <div className="flex flex-col">
        <div className="flex items-center gap-5">
          <DialogTrigger className="h-full">
            <div className="h-9 px-4 py-2 inline-flex items-center justify-center gap-2 rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-secondary-button/30">
              選擇
            </div>
          </DialogTrigger>
        </div>

        {selectedServiceItems.length > 0 && (
          <div className="flex flex-wrap flex-grow-0 mt-2 gap-2">
            {selectedServiceItems.map((item) => (
              <Chip
                key={item}
                onDelete={() => handleSelectedServiceItems(item)}
              >
                {item}
              </Chip>
            ))}
          </div>
        )}
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-5">請選擇服務項目</DialogTitle>
          <DialogFooter className="flex flex-wrap gap-5">
            {serviceItems.map((item) => (
              <span key={item} className="flex items-center space-x-2 w-32">
                <Checkbox
                  id={item}
                  defaultChecked={selectedServiceItems.includes(item)}
                  onClick={() => handleSelectedServiceItems(item)}
                />
                <Label htmlFor={item} className="cursor-pointer shrink-0">
                  {item}
                </Label>
              </span>
            ))}
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
