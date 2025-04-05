'use client';

import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createScheduleFormSchema } from '@/features/schedule/models/create-schedule-form-schema';
import SelectScheduleYearMonth from '@/features/schedule/components/select-schedule-year-month';
import transFormData from '@/features/client/utils/transform-form-time-data';
import useCreateSchedule from '@/features/schedule/hooks/useCreateSchedule';
import ClientShiftScheduleGrid from '@/features/schedule/components/client-shift-schedule-grid';
import Button from '@/ui/button';

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

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h1 className="font-extrabold">製作班表</h1>

        <SelectScheduleYearMonth />

        {methods.watch('month') && methods.watch('year') && (
          <ClientShiftScheduleGrid />
        )}

        {methods.watch('schedules')?.length ? (
          <Button type="submit" className="w-4/6">
            儲存
          </Button>
        ) : null}
      </form>
    </FormProvider>
  );
}
