'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { setClient } from '@/features/schedule/store/schedule-slice';

export default function ClientSelect() {
  const dispatch = useAppDispatch();
  const client = useAppSelector((state) => state.schedule.client);

  return (
    <Select
      onValueChange={(value) => dispatch(setClient({ id: value, name: '' }))}
      value={client.id}
    >
      <SelectTrigger>
        <SelectValue placeholder="選擇案主" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">案主1</SelectItem>
        <SelectItem value="2">案主2</SelectItem>
        <SelectItem value="3">案主3</SelectItem>
      </SelectContent>
    </Select>
  );
}
