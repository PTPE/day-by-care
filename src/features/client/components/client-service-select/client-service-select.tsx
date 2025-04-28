import Button from '@/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/ui/select';
import { serviceItems } from '@/const/service-items';

import ServiceChip from './_service-chip';

export default function ClientServiceSelect() {
  return (
    <div>
      <Select>
        <div className="flex items-center gap-2">
          <SelectTrigger className="bg-secondary">新增服務項目</SelectTrigger>
          <Button variant="outline" className="aspect-square p-0 text-accent">
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
        <ServiceChip onDelete={() => {}}>服務項目1</ServiceChip>
        <ServiceChip onDelete={() => {}}>服務項目2</ServiceChip>
        <ServiceChip onDelete={() => {}}>服務項目3</ServiceChip>
        <ServiceChip onDelete={() => {}}>服務項目3</ServiceChip>
      </div>
    </div>
  );
}
