'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { useGetClientsForClient } from '@/features/client/hooks/useGetClients';
import Badge from '@/ui/badge';
import Button from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog';
import Label from '@/ui/label';
import Checkbox from '@/ui/checkbox';
import { createScheduleFormSchema } from '@/features/schedule/models/create-schedule-form-schema';

export default function ImportClientDialog() {
  const { data } = useGetClientsForClient();
  const { watch } = useFormContext<z.infer<typeof createScheduleFormSchema>>();
  const { append, remove } = useFieldArray({
    name: 'schedules',
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">匯入案主</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>匯入案主</DialogTitle>

          <DialogDescription className="hidden">
            選擇案主後，將會自動填入班表
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3">
          {data?.map((client) => (
            <Badge
              key={client.client_id}
              variant={
                watch('schedules')?.some(
                  (field) => field.client_id === client.client_id
                )
                  ? 'default'
                  : 'outline'
              }
              className="relative py-2 cursor-pointer"
            >
              <Checkbox
                className="absolute hidden cursor-default"
                id={client.client_id}
                onCheckedChange={(checked) => {
                  if (checked) {
                    append({
                      client_id: client.client_id,
                    });
                  } else {
                    const removedIndex = watch('schedules').findIndex(
                      (schedule) => schedule.client_id === client.client_id
                    );

                    remove(removedIndex);
                  }
                }}
              />
              <Label htmlFor={client.client_id} className="cursor-pointer">
                {client.clientName}
              </Label>
            </Badge>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
