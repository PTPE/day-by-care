'use client';

import { useEffect } from 'react';

import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { scheduleFormSchema } from '@/features/schedule/models/schedule-form-schema';
import SelectScheduleYearMonth from '@/features/schedule/components/select-schedule-year-month';
import transFormData from '@/features/client/utils/transform-form-time-data';
import useCreateSchedule from '@/features/schedule/hooks/useCreateSchedule';
import ClientShiftScheduleGrid from '@/features/schedule/components/client-shift-schedule-grid';
import useGetMonthlySchedules from '@/features/schedule/hooks/useGetMonthlySchedules';
import Button from '@/ui/button';

export default function CreateSchedule() {
  const methods = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
  });

  const { mutate: createClient } = useCreateSchedule();

  const { data: defaultData } = useGetMonthlySchedules({
    year: methods.watch('year') || 0,
    month: methods.watch('month') || 0,
  });

  const onSubmit = (data: z.infer<typeof scheduleFormSchema>) => {
    if (!data.year || !data.month) return;
    createClient(transFormData({ year: data.year, month: data.month, data }));
  };

  useEffect(() => {
    if (!defaultData) return;

    methods.reset(defaultData);
  }, [defaultData, methods]);

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h1 className="font-extrabold">製作班表</h1>

        <SelectScheduleYearMonth />

        {methods.watch('month') && methods.watch('year') ? (
          <ClientShiftScheduleGrid />
        ) : null}

        {methods.watch('schedules')?.length ? (
          <Button type="submit" className="w-4/6">
            儲存
          </Button>
        ) : null}
      </form>
    </FormProvider>
  );
}
