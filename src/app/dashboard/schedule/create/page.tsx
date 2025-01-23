'use client';

import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CalendarCell from '@/features/schedule/components/calendar-cell';
import SelectShiftTimeDialog from '@/features/schedule/components/select-shift-time-dialog/select-shift-time-dialog';
import { createScheduleFormSchema } from '@/features/schedule/models/create-schedule-form-schema';
import SelectScheduleYearMonth from '@/features/schedule/components/select-schedule-year-month';
import ImportClientDialog from '@/features/schedule/components/import-client-dialog';
import useGetClients from '@/features/client/hooks/useGetClients';
import Button from '@/ui/button';
import transFormData from '@/features/client/utils/transform-form-time-data';
import useCreateSchedule from '@/features/schedule/hooks/useCreateSchedule';

const weekdays = [
  { label: '星期天', value: 7 },
  { label: '星期一', value: 1 },
  { label: '星期二', value: 2 },
  { label: '星期三', value: 3 },
  { label: '星期四', value: 4 },
  { label: '星期五', value: 5 },
  { label: '星期六', value: 6 },
];

export default function CreateSchedule() {
  const methods = useForm<z.infer<typeof createScheduleFormSchema>>({
    resolver: zodResolver(createScheduleFormSchema),
  });

  const { mutate: createClient } = useCreateSchedule();

  const onSubmit = (data: z.infer<typeof createScheduleFormSchema>) => {
    createClient(transFormData({ year: data.year, month: data.month, data }));
    // console.log(
    //   data.schedules.map((schedule) => ({
    //     client_id: schedule.client_id,
    //     month: data.month,
    //     year: data.year,
    //     timeSlots: transformFormTimeData({
    //       year: data.year,
    //       month: data.month,
    //       timeSlots: schedule.timeSlots,
    //     }),
    //   }))
    // );
  };

  const { data: clients } = useGetClients();

  const importedClients =
    clients?.filter((client) =>
      methods
        .watch('schedules')
        .some((field) => field.client_id === client.client_id)
    ) || [];

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h1 className="font-extrabold">製作班表</h1>

        <SelectScheduleYearMonth />

        <div className="space-y-5">
          <div className="grid grid-cols-8 items-center gap-5">
            <ImportClientDialog />

            {weekdays.map((weekday) => (
              <CalendarCell key={weekday.value}>{weekday.label}</CalendarCell>
            ))}
          </div>

          {importedClients.map((client, cliendIndex) => (
            <div
              className="grid grid-cols-8 items-center gap-5"
              key={client.client_id}
            >
              <CalendarCell className="flex flex-col items-center">
                <span className="icon-[streamline-emojis--old-man-2] text-5xl" />
                <p>{client.clientName}</p>
              </CalendarCell>

              {weekdays.map((weekday, index) => (
                <SelectShiftTimeDialog
                  key={weekday.value}
                  clientIndex={cliendIndex}
                  dayIndex={index}
                  day={weekday.value}
                />
              ))}
            </div>
          ))}
        </div>
        <Button type="submit">儲存</Button>
      </form>
    </FormProvider>
  );
}
