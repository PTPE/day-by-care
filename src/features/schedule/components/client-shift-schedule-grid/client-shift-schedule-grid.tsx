import { Fragment } from 'react';

import { z } from 'zod';
import { useFormContext } from 'react-hook-form';

import { useGetClientsForClient } from '@/features/client/hooks/useGetClients';
import { createScheduleFormSchema } from '@/features/schedule/models/create-schedule-form-schema';

import ImportClientDialog from './_import-client-dialog';
import SelectShiftTimeDialog from './_select-shift-time-dialog';

const weekdays = [
  { label: '星期天', value: 7 },
  { label: '星期一', value: 1 },
  { label: '星期二', value: 2 },
  { label: '星期三', value: 3 },
  { label: '星期四', value: 4 },
  { label: '星期五', value: 5 },
  { label: '星期六', value: 6 },
];

export default function ClientShiftScheduleGrid() {
  const { watch } = useFormContext<z.infer<typeof createScheduleFormSchema>>();

  const { data: clients } = useGetClientsForClient();

  const importedClients =
    clients?.filter((client) =>
      watch('schedules')?.some((field) => field.client_id === client.client_id)
    ) || [];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-8 items-center gap-5">
        <ImportClientDialog />

        {weekdays.map((weekday) => (
          <div
            className="rounded bg-secondary shadow-md px-6 py-3 h-full"
            key={weekday.value}
          >
            {weekday.label}
          </div>
        ))}

        {importedClients.map((client, cliendIndex) => (
          <Fragment key={client.client_id}>
            <div className="flex flex-col items-center rounded bg-secondary shadow-md px-6 py-3 h-full">
              <span className="icon-[streamline-emojis--old-man-2] text-5xl" />
              <p>{client.clientName}</p>
            </div>

            {weekdays.map((weekday, index) => (
              <SelectShiftTimeDialog
                key={weekday.value}
                clientIndex={cliendIndex}
                dayIndex={index}
                day={weekday.value}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
