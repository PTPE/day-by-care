import { useState } from 'react';

import Button from '@/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { serviceItemMap } from '@/const/service-items';
import { ServiceItemId } from '@/features/client/types';

import ServiceChip from './_service-chip';

type Props = {
  onChange: (value: ServiceItemId[]) => void;
  serviceItemsIds: ServiceItemId[];
};

export default function ClientServiceSelect({
  onChange,
  serviceItemsIds,
}: Props) {
  const [selectedServiceItems, setSelectedServiceItems] =
    useState<ServiceItemId[]>(serviceItemsIds);

  const serviceItems = Object.entries(serviceItemMap).map(([key, value]) => ({
    id: key,
    name: value,
  }));

  const handleSelectChange = (value: ServiceItemId) => {
    setSelectedServiceItems((prev) => [...prev, value]);
  };

  return (
    <div>
      <Select onValueChange={handleSelectChange}>
        <div className="flex items-center gap-2">
          <SelectTrigger className="bg-secondary">
            <SelectValue placeholder="新增服務項目" />
          </SelectTrigger>
          <Button
            variant="outline"
            className="aspect-square p-0 text-accent"
            onClick={() => onChange(selectedServiceItems)}
          >
            ＋
          </Button>
        </div>

        <SelectContent>
          {serviceItems.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="my-3 flex flex-wrap gap-2">
        {serviceItemsIds.map((item) => (
          <ServiceChip
            key={item}
            onDelete={() => {
              setSelectedServiceItems((prev) =>
                prev.filter((id) => id !== item)
              );
              onChange(selectedServiceItems);
            }}
          >
            {serviceItems.find((service) => service.id === item)?.name}
          </ServiceChip>
        ))}
      </div>
    </div>
  );
}
